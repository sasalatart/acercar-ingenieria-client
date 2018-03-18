import humps from 'humps';
import { getLocale } from '../../ducks/i18n';
import {
  signOut,
  getIsLoggedIn,
} from '../../ducks/sessions';
import { displayErrorNotification } from '../../ducks/notifications';
import messages from '../../../i18n/messages';

function getMessage(status, locale) {
  return status === 401 || status === 403
    ? messages[locale]['errors.unauthorized']
    : 'Error';
}

function getDescription(status, body, locale) {
  if (status === 401 || status === 403) {
    return messages[locale]['errors.unauthorizedDescription'];
  }

  if (status >= 500) {
    return messages[locale]['errors.server'];
  }

  const { message, errors } = body;
  return message || (errors.fullMessages || errors).join(', ');
}

export default async function parseError(body, status, payload, store) {
  const camelizedBody = humps.camelizeKeys(body);

  const state = store.getState();
  const locale = getLocale(state);
  const loggedIn = getIsLoggedIn(state);

  if (loggedIn && (status === 401 || status === 403)) {
    store.dispatch(signOut());
  }

  store.dispatch(displayErrorNotification({
    message: getMessage(status, locale),
    description: getDescription(status, camelizedBody, locale),
  }));

  return Promise.reject(payload);
}
