import humps from 'humps';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { normalize } from 'normalizr';
import { getLocale } from '../ducks/i18n';
import { signOut, setTokens, getTokens, getCurrentUserEntity } from '../ducks/sessions';
import { displayNotification, NOTIFICATION_TYPES } from '../ducks/notifications';
import messages from '../../i18n/messages';

const REQUEST_KEYS = ['headers', 'method', 'url', 'body'];
const TOKEN_HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

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
  const type = NOTIFICATION_TYPES.error;

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

  store.dispatch(displayNotification({ message, description, type }));
  return Promise.reject(message);
}

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !action.payload.method) {
    return next(action);
  }

  const tokens = getTokens(store.getState());
  const params = {
    headers: { 'Content-Type': 'application/json', ...tokens },
    ...humps.decamelizeKeys(pick(action.payload, REQUEST_KEYS)),
  };

  params.body = JSON.stringify(params.body);
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
