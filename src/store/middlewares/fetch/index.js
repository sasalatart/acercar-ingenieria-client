import { getTokens } from '../../ducks/sessions';
import refreshTokens from './tokens';
import buildParams from './params';
import parseResponse from './response';
import parseError from './errors';

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !action.payload.url || action.type.includes('REJECTED')) {
    return next(action);
  }

  const tokens = getTokens(store.getState());
  const params = buildParams(action.payload, tokens);

  const { url, ...rest } = params;

  const promise = window.fetch(url, rest)
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
  }).catch(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`${action.type} caught at middleware.`);
    }
  });
};

export default fetchMiddleware;
