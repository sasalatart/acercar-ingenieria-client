import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { usersSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory, {
  prepareGetPagingFns,
  removeFromAllPages,
  resetPaginationActionFactory,
} from './paginations';
import { TYPES as USERS_TYPES } from './users';
import { getCollectionParams as getAdminsCollectionParams } from '../../lib/admins';
import { getCollectionParams as getUsersCollectionParams } from '../../lib/users';
import collections from '../../lib/collections';

const commonArgs = [collections.admins, usersSchema];
const platformPagingFns = pagingFnsFactory(...commonArgs);
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: collections.majors });

const INITIAL_STATE = Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
  selectedUserId: undefined,
});

const TYPES = {
  LOAD_INDEX: 'admins/LOAD_INDEX',
  SET_SELECTED_USER: 'admins/SET_SELECTED_USER',
  UNSET_SELECTED_USER: 'admins/UNSET_SELECTED_USER',
  UPDATE_ROLE: 'admins/UPDATE_ROLE',
  RESET_PAGINATION: 'admins/RESET_PAGINATION',
};

export const getPagingFns = prepareGetPagingFns(({ baseResourceId }) => (
  baseResourceId ? majorsPagingFns : platformPagingFns
));

export function loadAdmins(page = 1, majorId, query) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/admins` : '/admins',
      query: { page, ...query },
      fetchParams: { page, ...query, ...getAdminsCollectionParams(majorId) },
      responseSchema: [usersSchema],
    },
  };
}

export function setSelectedUser(id) {
  return {
    type: TYPES.SET_SELECTED_USER,
    payload: { id },
  };
}

export function unsetSelectedUser() {
  return {
    type: TYPES.UNSET_SELECTED_USER,
  };
}

export function toggleAdmin(id, majorId, promote) {
  const suffixUrl = `/users/${id}/admin`;
  return {
    type: TYPES.UPDATE_ROLE,
    payload: {
      method: promote ? 'POST' : 'DELETE',
      url: majorId ? `/majors/${majorId}${suffixUrl}` : suffixUrl,
      fetchParams: getUsersCollectionParams(majorId, { id }),
      responseSchema: usersSchema,
    },
  };
}

export const resetPagination = resetPaginationActionFactory(TYPES.RESET_PAGINATION);

export default function adminsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case TYPES.SET_SELECTED_USER:
      return state.set('selectedUserId', payload.id);
    case TYPES.UNSET_SELECTED_USER:
      return state.set('selectedUserId', undefined);
    case `${TYPES.UPDATE_ROLE}_FULFILLED`: {
      const pageAction = type.includes(TYPES.PROMOTE) ? 'addToPage' : 'removeFromPage';
      return getPagingFns(payload)[pageAction](state, payload.request.fetchParams);
    }
    case `${TYPES.UPDATE_ROLE}_REJECTED`: {
      return state.set('selectedUserId', undefined);
    }
    case `${USERS_TYPES.DESTROY}_FULFILLED`: {
      const { fetchParams } = payload.request;
      return removeFromAllPages(state, [majorsPagingFns, platformPagingFns], fetchParams);
    }
    case TYPES.RESET_PAGINATION:
      return getPagingFns(payload).reset(state, payload.baseResourceId);
    default:
      return state;
  }
}

export const getAdminsData = state => state.admins;

export const getSelectedUserId = createSelector(
  getAdminsData,
  adminsData => adminsData.get('selectedUserId'),
);

export const getSelectedUserEntity = createSelector(
  getSelectedUserId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);
