import { combineReducers } from 'redux';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import keyMirror from 'keymirror';
import { getLocale } from './i18n';
import { getIsRequestingFactory } from './loading';
import { withFulfilledTypes } from './shared';
import paginationReducerFactory, { paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { notificationsSchema } from '../../schemas';
import messages from '../../i18n/messages';
import { getLoadIndexType, suffixes } from '../../lib/notifications';

const INITIAL_STATE = new Map({
  count: 0,
  countTimestamp: new Date(),
});

export const TYPES = withFulfilledTypes({
  LOAD_UNSEEN: 'notifications/LOAD_UNSEEN',
  LOAD_SEEN: 'notifications/LOAD_SEEN',
  SET_ALL_AS_SEEN: 'notifications/SET_ALL_AS_SEEN',
  LOAD_COUNT: 'notifications/LOAD_COUNT',
  SET_COUNT: 'notifications/SET_COUNT',
  DISPLAY: 'notifications/DISPLAY',
});

function notificationsDataReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case TYPES.LOAD_COUNT_FULFILLED:
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

export default combineReducers({
  data: notificationsDataReducer,
  seenPagination: paginationReducerFactory({
    setPage: TYPES.LOAD_SEEN_FULFILLED,
  }),
  unseenPagination: paginationReducerFactory({
    setPage: TYPES.LOAD_UNSEEN_FULFILLED,
    resetPagination: TYPES.SET_ALL_AS_SEEN_FULFILLED,
  }),
});

export function loadNotifications({ suffix, query }) {
  const types = { LOAD_INDEX: getLoadIndexType(TYPES, suffix) };
  const urlOptions = suffix === suffixes.seen ? { suffix } : undefined;
  const { loadIndex } = crudActionsFactory(types, notificationsSchema, urlOptions);
  return dispatch => dispatch(loadIndex({ query }));
}

export function setAllAsSeen() {
  return {
    type: TYPES.SET_ALL_AS_SEEN,
    payload: {
      method: 'PUT',
      url: '/notifications/seen',
    },
  };
}

export function loadNotificationsCount() {
  return {
    type: TYPES.LOAD_COUNT,
    payload: {
      method: 'GET',
      url: '/notifications/count',
    },
  };
}

export function setNotificationsCount(data) {
  return {
    type: TYPES.SET_COUNT,
    payload: data,
  };
}

const getNotificationsState = state => state.notifications;

export const getNotificationsCount = createSelector(
  getNotificationsState,
  notificationsState => notificationsState.data.get('count'),
);

export function getPaginationData(state, params) {
  return paginationDataSelectorFactory(
    getNotificationsState,
    `${params.suffix}Pagination`,
    notificationsSchema,
  )(state, params);
}

export function getIsLoadingNotifications(state, params) {
  const type = getLoadIndexType(TYPES, params.suffix);
  return getIsRequestingFactory(type)(state, params);
}

export const getIsSettingAllAsSeen = getIsRequestingFactory(TYPES.SET_ALL_AS_SEEN);

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
