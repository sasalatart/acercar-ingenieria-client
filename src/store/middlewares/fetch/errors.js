import humps from 'humps';
import { getLocale } from '../../ducks/i18n';
import {
  signOut,
  getCurrentUserEntity,
} from '../../ducks/sessions';
import { displayErrorNotification } from '../../ducks/notifications';
import messages from '../../../i18n/messages';

export default async function parseError(status, body, store) {
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
