import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';
import pagingFnsFactory from './paginations';

export const collection = 'users';
const commonArgs = [collection, usersSchema];
const platformPagingFns = pagingFnsFactory(...commonArgs);
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors' });

const INITIAL_STATE = Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
});

export const TYPES = {
  LOAD_INDEX: 'users/LOAD_INDEX',
  LOAD: 'users/LOAD',
  DESTROY: 'users/DESTROY',
};

export function getCollectionParams(majorId, admins) {
  return {
    collection: admins ? 'admins' : collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}

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
      urlParams: { ...getCollectionParams(majorId), page },
      responseSchema: [usersSchema],
    },
  };
}

export function loadUser(id) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/users/${id}`,
      urlParams: { collection, id },
      responseSchema: usersSchema,
    },
  };
}

export function destroyUser(id) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: `/users/${id}`,
      urlParams: { collection, id },
    },
  };
}

export default function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`: {
      const { baseResourceId } = action.payload.request.urlParams;
      return getPagingFns(baseResourceId).reducer.setPage(state, action.payload);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromMajors = majorsPagingFns.reducer.removeFromPage(state, urlParams);
      return platformPagingFns.reducer.removeFromPage(fromMajors, urlParams);
    }
    default:
      return state;
  }
}

export const getUsersData = state => state.users;

const getId = (state, params) => params.id;

export const getUserEntity = createSelector(
  getId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);
