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

export function profileUpdatedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.profileUpdated.message'],
    }));
  };
}

export function passwordChangedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.passwordChanged.message'],
      description: messages[locale]['notifications.passwordChanged.description'],
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

export function emailConfirmedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.emailConfirmed.message'],
      description: messages[locale]['notifications.emailConfirmed.description'],
    }));
  };
}

export function majorEditedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.majorUpdated.message'],
    }));
  };
}

export function questionCreatedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.questionCreated.message'],
    }));
  };
}

export function questionUpdatedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.questionUpdated.message'],
    }));
  };
}

export function questionDestroyedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.questionDestroyed.message'],
    }));
  };
}

export function articleCreatedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.articleCreated.message'],
    }));
  };
}

export function articleUpdatedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.articleUpdated.message'],
    }));
  };
}

export function articleDestroyedNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.articleDestroyed.message'],
    }));
  };
}

export function emailSentNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displaySuccessNotification({
      message: messages[locale]['notifications.emailSent.message'],
    }));
  };
}
