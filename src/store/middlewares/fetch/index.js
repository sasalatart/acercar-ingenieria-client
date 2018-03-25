import URI from 'urijs';
import humps from 'humps';
import { getTokens } from '../../ducks/sessions';
import { getLocale } from '../../ducks/i18n';
import refreshTokens from './tokens';
import buildParams from './params';
import parseResponse from './response';
import parseError from './errors';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !action.payload.url || action.type.includes('REJECTED')) {
    return next(action);
  }

  const state = store.getState();
  const locale = getLocale(state);
  const tokens = getTokens(state);
  const params = buildParams(action.payload, tokens);

  const { url, ...rest } = params;

  const query = humps.decamelizeKeys(URI.parseQuery(url));
  const urlWithLocale = URI(url).query({
    ...query,
    locale: locale.split('-')[0],
  }).toString();

  const promise = window.fetch(`${BASE_URL}${urlWithLocale}`, { ...rest, credentials: 'include' })
    .then(async (response) => {
      const responseContentType = response.headers.get('content-type');
      if (responseContentType && responseContentType.includes('text/html')) {
        return Promise.resolve();
      }

      refreshTokens(response, store, action.type);
      const body = response.status === 204 ? {} : await response.json();

      return response.status < 400
        ? parseResponse(body, response.headers, action.payload)
        : parseError(body, response.status, action.payload, store);
    });

  return next({
    type: action.type,
    payload: {
      promise,
      data: action.payload,
    },
  });
};

export default fetchMiddleware;
