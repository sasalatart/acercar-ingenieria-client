import { Map } from 'immutable';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { notification } from 'antd';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';
import { goToLanding } from '../../routes';
import messages from '../../i18n/messages';

const INITIAL_STATE = new Map({
  currentUserId: undefined,
  tokens: {},
});

export const TYPES = {
  SET_TOKENS: 'sessions/SET_TOKENS',
  SIGN_IN: 'fetch::sessions/SIGN_IN',
  SIGN_UP: 'fetch::sessions/SIGN_UP',
  CONFIRM_EMAIL: 'fetch::/sessions/CONFIRM_EMAIL',
  SIGN_OUT: 'fetch::sessions/SIGN_OUT',
};

export function setTokens(tokens) {
  return {
    type: TYPES.SET_TOKENS,
    payload: {
      tokens,
    },
  };
}

export function signIn(credentials) {
  return {
    type: TYPES.SIGN_IN,
    payload: {
      method: 'POST',
      url: '/auth/sign_in',
      data: credentials,
      responseSchema: usersSchema,
    },
  };
}

export function signUp(credentials, locale) {
  return dispatch =>
    dispatch({
      type: TYPES.SIGN_UP,
      payload: {
        method: 'POST',
        url: '/auth',
        data: credentials,
      },
    }).then(() => {
      notification.info({
        message: messages[locale]['auth.signUpOneMoreStep'],
        description: messages[locale]['auth.signUpEmailSent'],
        duration: 60,
      });
      dispatch(goToLanding());
    });
}

export function confirmEmail(url, locale) {
  return dispatch =>
    dispatch({
      type: TYPES.CONFIRM_EMAIL,
      payload: {
        method: 'GET',
        url,
      },
    }).then(() => {
      notification.success({
        message: messages[locale]['auth.signUpEmailConfirmation'],
        description: messages[locale]['auth.signUpEmailConfirmed'],
      });
    });
}

export function signOut() {
  return {
    type: TYPES.SIGN_OUT,
    payload: {
      method: 'DELETE',
      url: '/auth/sign_out',
    },
  };
}

export default function sessionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_TOKENS:
      return state.set('tokens', action.payload.tokens);
    case `${TYPES.SIGN_IN}_FULFILLED`:
      return state.set('currentUserId', action.payload.result);
    default:
      return state;
  }
}

export const getSessionsData = state => state.sessions;

export const getTokens = createSelector(
  getSessionsData,
  sessionsData => sessionsData.get('tokens'),
);

export const getCurrentUserId = createSelector(
  getSessionsData,
  sessionsData => sessionsData.get('currentUserId'),
);

export const getCurrentUserEntity = createSelector(
  getCurrentUserId,
  getEntities,
  (currentUserId, entities) =>
    denormalize(currentUserId, usersSchema, entities),
);
