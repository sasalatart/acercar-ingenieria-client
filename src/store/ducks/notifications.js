import { Map } from 'immutable';
import { createSelector } from 'reselect';
import keyMirror from 'keymirror';
import { getLocale } from './i18n';
import pagingFnsFactory from './paginations';
import messages from '../../i18n/messages';
import { notificationsSchema } from '../../schemas';

export const collection = 'notifications';
const commonArgs = [collection, notificationsSchema];

const pendingPagingFns = pagingFnsFactory(...commonArgs, { suffix: 'seen' });
const seenPagingFns = pagingFnsFactory(...commonArgs, { suffix: 'pending' });

const INITIAL_STATE = new Map({
  count: 0,
  countTimestamp: new Date(),
  pagination: new Map({
    platform: new Map({}),
  }),
});

export function getPagingFns(seen) {
  return seen ? seenPagingFns : pendingPagingFns;
}

export const NOTIFICATION_TYPES = keyMirror({
  success: null, info: null, warning: null, error: null, open: null,
});

export const TYPES = {
  LOAD_UNSEEN: 'notifications/LOAD_UNSEEN',
  LOAD_SEEN: 'notifications/LOAD_SEEN',
  LOAD_COUNT: 'notifications/LOAD_COUNT',
  SET_COUNT: 'notifications/SET_COUNT',
  DISPLAY: 'notifications/DISPLAY',
};

export function loadNotifications(page = 1, seen) {
  const suffix = seen ? 'seen' : 'pending';

  return {
    type: seen ? TYPES.LOAD_SEEN : TYPES.LOAD_UNSEEN,
    payload: {
      method: 'GET',
      url: seen ? '/notifications/seen' : '/notifications',
      query: { page },
      urlParams: { collection, page, suffix },
      responseSchema: [notificationsSchema],
    },
  };
}

export function loadNotificationsCount() {
  return {
    type: TYPES.LOAD_COUNT,
    payload: {
      method: 'GET',
      url: '/notifications/count',
      urlParams: { collection, suffix: 'count' },
    },
  };
}

export function setNotificationsCount(data) {
  return {
    type: TYPES.SET_COUNT,
    payload: data,
  };
}

export default function notificationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_SEEN}_FULFILLED`:
    case `${TYPES.LOAD_UNSEEN}_FULFILLED`: {
      return getPagingFns(action.type.includes(TYPES.LOAD_SEEN))
        .reducer
        .setPage(state, action.payload);
    }
    case `${TYPES.LOAD_COUNT}_FULFILLED`:
      return state.set('count', action.payload.count);
    case TYPES.SET_COUNT: {
      const { count, timestamp } = action.payload;
      return new Date(timestamp) > new Date(state.get('countTimestamp'))
        ? state.merge({ count, countTimestamp: timestamp })
        : state;
    }
    default:
      return state;
  }
}

const getNotificationsData = state => state.notifications;

export const getNotificationsCount = createSelector(
  getNotificationsData,
  notificationsData => notificationsData.get('count'),
);

function displayNotification(
  message,
  description,
  type = NOTIFICATION_TYPES.open,
  duration = 10,
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
      message: messages[locale]['notifications.justOneMoreStep'],
      description: messages[locale]['notifications.signUpOneMoreStep.description'],
      duration: 30,
    }));
  };
}

export function recoverPasswordEmailSentNotification() {
  return (dispatch, getState) => {
    const locale = getLocale(getState());
    dispatch(displayInfoNotification({
      message: messages[locale]['notifications.justOneMoreStep'],
      description: messages[locale]['notifications.recoverPassword.description'],
      duration: 30,
    }));
  };
}
