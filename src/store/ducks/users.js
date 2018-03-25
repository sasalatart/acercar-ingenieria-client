import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
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
  RESET_PAGINATION: 'users/RESET_PAGINATION',
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

export function loadUsers(page = 1, majorId, query) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/users` : '/users',
      query: { page, ...query },
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

export function resetPagination(majorId) {
  return {
    type: TYPES.RESET_PAGINATION,
    payload: { majorId },
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
    case TYPES.RESET_PAGINATION: {
      const { majorId } = action.payload;
      return getPagingFns(majorId).reducer.reset(state, majorId);
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
