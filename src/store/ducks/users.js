import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';

const TYPES = {
  LOAD: 'fetch::users/LOAD',
  UPDATE: 'fetch::users/UPDATE',
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
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/users/${userId}`,
      body,
      responseSchema: usersSchema,
    },
  };
}

export const getUsersData = state => state.users;

export const getUserId = (state, params) => params.userId;

export const getUserEntity = createSelector(
  getUserId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);
