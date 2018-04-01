import humps from 'humps';
import pick from 'lodash/pick';
import {
  signOut,
  getIsLoggedIn,
} from '../../ducks/sessions';
import { displayErrorNotification } from '../../ducks/notifications';

export default async function parseError(body, status, payload, store) {
  const state = store.getState();
  const loggedIn = getIsLoggedIn(state);

  if (loggedIn && (status === 401 || status === 403)) {
    store.dispatch(signOut());
  }

  const { error, errors } = humps.camelizeKeys(body);
  store.dispatch(displayErrorNotification({
    message: 'Error',
    description: error || errors[0] || errors.fullMessages,
  }));

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ request: pick(payload, 'urlParams') });
}
