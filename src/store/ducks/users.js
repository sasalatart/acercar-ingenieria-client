import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import { getId } from './shared';
import { usersSchema } from '../../schemas';
import pagingFnsFactory, {
  prepareGetPagingFns,
  removeFromAllPages,
  resetPaginationActionFactory,
} from './paginations';
import { usersCollection as collection } from '../../lib/collections';
import { getCollectionParams } from '../../lib/users';

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

export const getPagingFns = prepareGetPagingFns(({ baseResourceId }) => (
  baseResourceId ? majorsPagingFns : platformPagingFns
));

export function loadUsers(page = 1, majorId, query) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/users` : '/users',
      query: { page, ...query },
      fetchParams: { ...getCollectionParams(majorId), page },
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
      fetchParams: { collection, id },
      responseSchema: usersSchema,
    },
  };
}

export function destroyUser(id, majorId) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: majorId ? `/majors/${majorId}/users/${id}` : `/users/${id}`,
      fetchParams: { ...getCollectionParams(majorId), id },
    },
  };
}

export const resetPagination = resetPaginationActionFactory(TYPES.RESET_PAGINATION);

export default function usersReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { fetchParams } = payload.request;
      return removeFromAllPages(state, [majorsPagingFns, platformPagingFns], fetchParams);
    }
    case TYPES.RESET_PAGINATION:
      return getPagingFns(payload).reset(state, payload.baseResourceId);
    default:
      return state;
  }
}

export const getUsersData = state => state.users;

export const getUserEntity = createSelector(
  getId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);
