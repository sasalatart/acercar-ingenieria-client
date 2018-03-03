import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';
import { nestedPagingFnsFactory } from './paginations';

const majorsPagingFns = nestedPagingFnsFactory('users', usersSchema, 'majors');

const INITIAL_STATE = Map({
  pagination: new Map({
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
});

const TYPES = {
  LOAD: 'fetch::users/LOAD',
  LOAD_INDEX: 'fetch::users/LOAD_INDEX',
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

export function loadUsers(page, majorId) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: URI(`/majors/${majorId}/users`).query({ page }).toString(),
      urlParams: { majorId, page },
      responseSchema: [usersSchema],
    },
  };
}

export function getPagingFns(majorId) {
  return majorId
    ? majorsPagingFns
    : undefined;
}

export default function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(action.payload.request.urlParams.majorId).update(state, action.payload);
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
