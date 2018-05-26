import URI from 'urijs';
import get from 'lodash/get';
import { getTokens } from '../../ducks/sessions';
import { getLocale } from '../../ducks/i18n';
import refreshTokens from './tokens';
import buildParams from './params';
import parseResponse from './response';
import parseError from './errors';
import { BASE_API_URL } from '../../../lib/routes';

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !(action.payload.url && action.payload.method) || action.type.includes('REJECTED')) {
    return next(action);
  }

  const state = store.getState();
  const locale = getLocale(state);
  const tokens = get(action.payload, 'tokens', getTokens(state));
  const params = buildParams(action.payload, tokens, locale);

  const { url, query, ...rest } = params;
  const finalUrl = URI(`${BASE_API_URL}${url}`).query({ ...query }).toString();

  const promise = window.fetch(finalUrl, rest)
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
