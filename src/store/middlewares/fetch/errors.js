import humps from 'humps';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { goToLanding, goToSignIn } from '../../ducks/routes';
import { localSignOut, getIsLoggedIn } from '../../ducks/sessions';
import { displayErrorNotification } from '../../ducks/notifications';
import messages from '../../../i18n/messages';

export default async function parseError(body, status, payload, store, locale) {
  const { error, errors } = humps.camelizeKeys(body);
  const description = error || errors[0] || errors.fullMessages;

  const isLoggedIn = getIsLoggedIn(store.getState());
  if (isLoggedIn && description === messages[locale]['sessions.unauthenticated.error']) {
    store.dispatch(localSignOut());
  } else if (status === 401 || status === 403) {
    const action = isLoggedIn ? goToLanding() : goToSignIn();
    store.dispatch(action);
  }

  if (!get(payload, 'fetchParams.silentError')) {
    store.dispatch(displayErrorNotification({ message: 'Error', description }));
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ request: pick(payload, 'fetchParams') });
}
