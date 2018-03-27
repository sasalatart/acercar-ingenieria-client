import { Map } from 'immutable';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';
import {
  confirmationEmailSentNotification,
  resourceSuccessNotification,
} from './notifications';
import {
  goToLanding,
  goToProfile,
} from './routes';

const INITIAL_STATE = new Map({
  currentUserId: undefined,
  tokens: {},
});

export const TYPES = {
  SET_TOKENS: 'sessions/SET_TOKENS',
  SIGN_IN: 'sessions/SIGN_IN',
  SIGN_UP: 'sessions/SIGN_UP',
  CONFIRM_EMAIL: 'sessions/CONFIRM_EMAIL',
  SIGN_OUT: 'sessions/SIGN_OUT',
  UPDATE: 'sessions/UPDATE',
  CHANGE_PASSWORD: 'sessions/CHANGE_PASSWORD',
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
      body: credentials,
      responseSchema: usersSchema,
    },
  };
}

export function signUp(credentials) {
  return dispatch =>
    dispatch({
      type: TYPES.SIGN_UP,
      payload: {
        method: 'POST',
        url: '/auth',
        body: credentials,
      },
    }).then(() => {
      dispatch(confirmationEmailSentNotification());
      dispatch(goToLanding());
    });
}

export function confirmEmail(query) {
  return dispatch =>
    dispatch({
      type: TYPES.CONFIRM_EMAIL,
      payload: {
        method: 'GET',
        url: '/auth/confirmation',
        query,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('email', 'confirmed'));
    });
}

export function signOut() {
  return (dispatch) => {
    dispatch({
      type: TYPES.SIGN_OUT,
      payload: {
        method: 'DELETE',
        url: '/auth/sign_out',
      },
    });
    dispatch(goToLanding());
  };
}

export function updateProfile(id, body) {
  return async dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: `/users/${id}`,
        urlParams: { collection: 'profiles', id },
        body,
        responseSchema: usersSchema,
      },
    }).then(() => {
      dispatch(goToProfile());
    });
}

export function changePassword(body) {
  return dispatch =>
    dispatch({
      type: TYPES.CHANGE_PASSWORD,
      payload: {
        method: 'PUT',
        url: '/auth/password',
        body,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('password', 'updated'));
      dispatch(goToProfile());
    });
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

const getMajorId = (state, params) => params && params.majorId;

export const getIsLoggedIn = createSelector(
  getCurrentUserEntity,
  currentUser => !!currentUser,
);

export const getIsAdmin = createSelector(
  getIsLoggedIn,
  getCurrentUserEntity,
  (loggedIn, currentUser) => loggedIn && currentUser.admin,
);

export const getIsAdminOfMajor = createSelector(
  getIsLoggedIn,
  getMajorId,
  getCurrentUserEntity,
  (loggedIn, majorId, currentUser) =>
    loggedIn && currentUser.adminOfMajors.map(({ id }) => id).includes(majorId),
);

export const getIsAdminOrMajorAdmin = createSelector(
  getIsAdmin,
  getIsAdminOfMajor,
  (admin, adminOfMajor) => admin || adminOfMajor,
);
