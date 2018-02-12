import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';

const TYPES = {
  LOAD_USER: 'fetch::users/LOAD_USER',
};

export function loadUser(userId) {
  return {
    type: TYPES.LOAD_USER,
    payload: {
      method: 'GET',
      url: `/users/${userId}`,
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
