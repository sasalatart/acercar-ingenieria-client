import humps from 'humps';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { normalize } from 'normalizr';
import objectToFormData from 'object-to-formdata';
import { getLocale } from '../ducks/i18n';
import { signOut, setTokens, getTokens, getCurrentUserEntity } from '../ducks/sessions';
import { displayErrorNotification } from '../ducks/notifications';
import messages from '../../i18n/messages';

const TOKEN_HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];
const REQUEST_KEYS = ['headers', 'method', 'url', 'body'];

function refreshTokens(response, store) {
  const tokens = getTokens(store.getState());
  const newExpiry = response.headers.get('expiry');
  if (newExpiry && (!tokens.expiry || tokens.expiry < newExpiry)) {
    const newTokens = {};
    TOKEN_HEADERS.forEach((header) => { newTokens[header] = response.headers.get(header); });
    store.dispatch(setTokens(newTokens));
  }
}

async function parseResponse(body, responseSchema) {
  const camelizedBody = humps.camelizeKeys(body.data || body);
  return responseSchema ? normalize(camelizedBody, responseSchema) : camelizedBody;
}

async function parseError(status, body, store) {
  const camelizedBody = humps.camelizeKeys(body);

  const state = store.getState();
  const locale = getLocale(state);
  const loggedIn = !!getCurrentUserEntity(state);

  let message;
  let description;
  if (status === 401 || status === 403) {
    if (loggedIn) store.dispatch(signOut());
    message = messages[locale]['errors.unauthorized'];
    description = messages[locale]['errors.unauthorizedDescription'];
  } else if (status >= 500) {
    description = messages[locale]['errors.server'];
  } else {
    const { message: errorMessage, errors } = camelizedBody;
    description = errorMessage || (errors.fullMessages || errors).join(', ');
  }
  message = message || 'Error';

  store.dispatch(displayErrorNotification({ message, description }));
  return Promise.reject(message);
}

function getFileKeys(body) {
  if (!body) {
    return undefined;
  }

  const fileKeys = [];
  Object.keys(body).forEach((key) => {
    if (body[key] instanceof File) {
      fileKeys.push(key);
    }
  });

  return fileKeys;
}

function buildParams(payload, tokens) {
  const params = {
    headers: { ...tokens },
    ...humps.decamelizeKeys(pick(payload, REQUEST_KEYS)),
  };

  const fileKeys = getFileKeys(payload.body);
  if (isEmpty(fileKeys)) {
    params.headers['Content-Type'] = 'application/json';
    params.body = JSON.stringify(params.body);
  } else {
    const formData = objectToFormData(omit(params.body, fileKeys));
    fileKeys.forEach((fileKey) => {
      formData.append(fileKey, payload.body[fileKey]);
    });
    params.body = formData;
  }

  return params;
}

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !action.payload.method) {
    return next(action);
  }

  const tokens = getTokens(store.getState());
  const params = buildParams(action.payload, tokens);

  const { url, ...rest } = params;
  return next({
    type: action.type,
    payload: window.fetch(url, rest)
      .then(async (response) => {
        refreshTokens(response, store);
        const body = await response.json();

        return response.status < 400
          ? parseResponse(body, get(action.payload, 'responseSchema'))
          : parseError(response.status, body, store);
      }),
  });
};

export default fetchMiddleware;
