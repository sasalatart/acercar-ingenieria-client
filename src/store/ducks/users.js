import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import {
  profileUpdatedNotification,
  passwordChangedNotification,
} from './notifications';
import { goToLanding } from '../../routes';
import { usersSchema } from '../../schemas';

const TYPES = {
  LOAD: 'fetch::users/LOAD',
  UPDATE: 'fetch::users/UPDATE',
  CHANGE_PASSWORD: 'fetch::users/CHANGE_PASSWORD',
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
      dispatch(goToLanding());
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
      dispatch(goToLanding());
    });
}

export const getUsersData = state => state.users;

export const getUserId = (state, params) => params.userId;

export const getUserEntity = createSelector(
  getUserId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);
