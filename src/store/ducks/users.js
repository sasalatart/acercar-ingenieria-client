import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import {
  profileUpdatedNotification,
  passwordChangedNotification,
} from './notifications';
import ROUTES, {
  PROFILE_TAB_NAMES as TAB_NAMES,
  addQueryToUri,
} from '../../routes';
import { usersSchema } from '../../schemas';

const INITIAL_STATE = Map({
  currentTab: undefined,
});

const TYPES = {
  LOAD: 'fetch::users/LOAD',
  UPDATE: 'fetch::users/UPDATE',
  CHANGE_PASSWORD: 'fetch::users/CHANGE_PASSWORD',
  SET_TAB: 'users/SET_TAB',
};

export function loadUser(userId) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/users/${userId}`,
      responseSchema: usersSchema,
    },
  };
}

export function setProfileTab(tab) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_TAB,
      payload: { tab },
    });
    dispatch(addQueryToUri(ROUTES.PROFILE, { tab }));
  };
}

export function update(userId, body) {
  return async dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: `/users/${userId}`,
        body,
        responseSchema: usersSchema,
      },
    }).then(() => {
      dispatch(profileUpdatedNotification());
      dispatch(setProfileTab(TAB_NAMES.info));
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
      dispatch(passwordChangedNotification());
      dispatch(setProfileTab(TAB_NAMES.info));
    });
}

export default function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_TAB:
      return state.set('currentTab', action.payload.tab);
    default:
      return state;
  }
}

export const getUsersData = state => state.users;

export const getUserId = (state, params) => params.userId;

export const getUserEntity = createSelector(
  getUserId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);

export const getProfileTab = createSelector(
  getUsersData,
  usersData => usersData.get('currentTab'),
);
