import axios from 'axios';
import humps from 'humps';
import pick from 'lodash/pick';
import { normalize } from 'normalizr';
import { setTokens, getTokens } from '../ducks/sessions';

const TOKEN_HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];
const REQUEST_KEYS = ['headers', 'method', 'url', 'data'];

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !action.payload.method) {
    return next(action);
  }

  const params = {
    headers: {
      'Content-Type': 'application/json',
      ...getTokens(store.getState()),
    },
    ...action.payload,
  };

  return next({
    type: action.type,
    payload: axios(pick(params, REQUEST_KEYS))
      .then(({ data, headers }) => {
        if (headers['access-token']) {
          const newTokens = pick(headers, TOKEN_HEADERS);
          store.dispatch(setTokens(newTokens));
        }

        const camelizedResponse = humps.camelizeKeys(data.data || data);
        return action.payload.responseSchema
          ? normalize(camelizedResponse, action.payload.responseSchema)
          : camelizedResponse;
      }),
  });
};

export default fetchMiddleware;
