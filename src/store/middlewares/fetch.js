import axios from 'axios';
import humps from 'humps';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { normalize } from 'normalizr';
import { notification } from 'antd';
import { setTokens, getTokens } from '../ducks/sessions';

const TOKEN_HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];
const REQUEST_KEYS = ['headers', 'method', 'url', 'data'];

const fetchMiddleware = store => next => (action) => {
  if (!action.payload || !action.payload.method) {
    return next(action);
  }

  const tokens = getTokens(store.getState());

  const params = {
    headers: { 'Content-Type': 'application/json', ...tokens },
    ...humps.decamelizeKeys(pick(action.payload, REQUEST_KEYS)),
  };

  return next({
    type: action.type,
    payload: axios(params)
      .then(({ data, headers }) => {
        const newAccessToken = headers['access-token'];
        if (newAccessToken && newAccessToken !== tokens['access-token']) {
          const newTokens = pick(headers, TOKEN_HEADERS);
          store.dispatch(setTokens(newTokens));
        }

        const camelizedResponse = humps.camelizeKeys(data.data || data);
        return action.payload.responseSchema
          ? normalize(camelizedResponse, action.payload.responseSchema)
          : camelizedResponse;
      })
      .catch((error) => {
        const camelizedErrors = humps.camelizeKeys(error);
        const apiErrors = get(camelizedErrors.response, 'data.errors');
        const description = (apiErrors.fullMessages || apiErrors).join(', ');

        if (description) {
          notification.error({ message: 'Error', description, duration: 20 });
        }

        return Promise.reject(error);
      }),
  });
};

export default fetchMiddleware;
