import humps from 'humps';
import pick from 'lodash/pick';
import { getLocale } from '../../ducks/i18n';
import {
  signOut,
  getIsLoggedIn,
} from '../../ducks/sessions';
import { displayErrorNotification } from '../../ducks/notifications';
import messages from '../../../i18n/messages';

function getDescription(status, body, locale) {
  switch (true) {
    case (status === 401 || status === 403):
      return messages[locale]['errors.unauthorized'];
    case (status === 404):
      return messages[locale]['errors.notFound'];
    case (status >= 500):
      return messages[locale]['errors.server'];
    default: {
      const { message, error, errors } = body;
      return message || error || errors.fullMessages;
    }
  }
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
    message: 'Error',
    description: getDescription(status, camelizedBody, locale),
  }));

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ request: pick(payload, 'urlParams') });
}
