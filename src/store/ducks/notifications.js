import { Map } from 'immutable';
import { createSelector } from 'reselect';
import keyMirror from 'keymirror';
import { getLocale } from './i18n';
import pagingFnsFactory, { prepareGetPagingFns } from './paginations';
import messages from '../../i18n/messages';
import { notificationsSchema } from '../../schemas';
import collections from '../../lib/collections';
import { suffixes, getSuffix } from '../../lib/notifications';

const collection = collections.notifications;
const commonArgs = [collection, notificationsSchema];
const pendingPagingFns = pagingFnsFactory(...commonArgs, { suffix: suffixes.seen });
const seenPagingFns = pagingFnsFactory(...commonArgs, { suffix: suffixes.pending });

const INITIAL_STATE = new Map({
  count: 0,
  countTimestamp: new Date(),
  pagination: new Map({
    platform: new Map({}),
  }),
});

export const TYPES = {
  LOAD_UNSEEN: 'notifications/LOAD_UNSEEN',
  LOAD_SEEN: 'notifications/LOAD_SEEN',
  UPDATE_ALL_AS_SEEN: 'notifications/UPDATE_ALL_AS_SEEN',
  LOAD_COUNT: 'notifications/LOAD_COUNT',
  SET_COUNT: 'notifications/SET_COUNT',
  DISPLAY: 'notifications/DISPLAY',
};

export const getPagingFns = prepareGetPagingFns(({ suffix }) => (
  suffix === suffixes.seen ? seenPagingFns : pendingPagingFns
));

export function loadNotifications(page = 1, seen) {
  return {
    type: seen ? TYPES.LOAD_SEEN : TYPES.LOAD_UNSEEN,
    payload: {
      method: 'GET',
      url: seen ? '/notifications/seen' : '/notifications',
      query: { page },
      fetchParams: { collection, page, suffix: getSuffix(seen) },
      responseSchema: [notificationsSchema],
    },
  };
}

export function setAllAsSeen() {
  return {
    type: TYPES.UPDATE_ALL_AS_SEEN,
    payload: {
      method: 'PUT',
      url: '/notifications/seen',
      fetchParams: { collection, suffix: suffixes.seen },
    },
  };
}

export function loadNotificationsCount() {
  return {
    type: TYPES.LOAD_COUNT,
    payload: {
      method: 'GET',
      url: '/notifications/count',
      fetchParams: { collection, suffix: 'count' },
    },
  };
}

export function setNotificationsCount(data) {
  return {
    type: TYPES.SET_COUNT,
    payload: data,
  };
}

export default function notificationsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_SEEN}_FULFILLED`:
    case `${TYPES.LOAD_UNSEEN}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.UPDATE_ALL_AS_SEEN}_FULFILLED`:
      return pendingPagingFns.reducer.reset(state);
    case `${TYPES.LOAD_COUNT}_FULFILLED`:
      return state.set('count', payload.count);
    case TYPES.SET_COUNT: {
      const { count, timestamp } = payload;
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

export const NOTIFICATION_TYPES = keyMirror({
  success: null, info: null, warning: null, error: null, open: null,
});

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
