import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';
import {
  pagingFnsFactory,
  nestedPagingFnsFactory,
} from './paginations';

const platformPagingFns = pagingFnsFactory('users', usersSchema);
const majorsPagingFns = nestedPagingFnsFactory('users', usersSchema, 'majors');

const INITIAL_STATE = Map({
  pagination: new Map({
    platform: new Map({}),
    platformMeta: new Map({}),
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
});

const TYPES = {
  LOAD: 'fetch::users/LOAD',
  LOAD_INDEX: 'fetch::users/LOAD_INDEX',
};

export function getPagingFns(majorId) {
  return majorId ? majorsPagingFns : platformPagingFns;
}

export function loadUsers(page, majorId) {
  const baseUrl = majorId ? `/majors/${majorId}/users` : '/users';

  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: URI(baseUrl).query({ page }).toString(),
      urlParams: { majorId, page },
      responseSchema: [usersSchema],
    },
  };
}

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

export default function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(majorId).update(state, action.payload);
    }
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
