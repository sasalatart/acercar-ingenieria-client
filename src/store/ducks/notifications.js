import keyMirror from 'keymirror';
import { getLocale } from './i18n';
import messages from '../../i18n/messages';

export const NOTIFICATION_TYPES = keyMirror({
  success: null, info: null, warning: null, error: null, open: null,
});

export const TYPES = {
  DISPLAY: 'notifications/DISPLAY',
};

function displayNotification(
  message,
  description,
  type = NOTIFICATION_TYPES.open,
  duration = 20,
) {
  return {
    type: TYPES.DISPLAY,
    payload: {
      message,
      description,
      type,
      duration,
    },
  };
}

function displayInfoNotification({ message, description, duration }) {
  return displayNotification(message, description, NOTIFICATION_TYPES.info, duration);
}

function displaySuccessNotification({ message, description, duration }) {
  return displayNotification(message, description, NOTIFICATION_TYPES.success, duration);
}

export function displayErrorNotification({ message, description, duration }) {
  return displayNotification(message, description, NOTIFICATION_TYPES.error, duration);
}

export function resourceSuccessNotification(resourceType, action) {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    const resourceMessage = messages[locale][`notifications.resource.${resourceType}`];
    const actionMessage = messages[locale][`notifications.actions.${action}`];

    dispatch(displaySuccessNotification({
      message: actionMessage.replace('{resource}', resourceMessage),
    }));
  };
}

export function confirmationEmailSentNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displayInfoNotification({
      message: messages[locale]['notifications.signUpOneMoreStep.message'],
      description: messages[locale]['notifications.signUpOneMoreStep.description'],
      duration: 60,
    }));
  };
}
