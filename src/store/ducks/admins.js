import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { usersSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory, {
  prepareGetPagingFns,
  removeFromAllPages,
  resetPaginationActionFactory,
} from './paginations';
import { getUserId, getMajorId } from './shared';
import { TYPES as USERS_TYPES } from './users';

const collection = 'admins';
const commonArgs = [collection, usersSchema];
const platformPagingFns = pagingFnsFactory(...commonArgs);
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors' });

const INITIAL_STATE = Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
  selectedUserId: undefined,
  updatingAdminsIds: new Set([]),
  updatingMajorAdminsIds: new Map({}),
});

const TYPES = {
  LOAD_INDEX: 'admins/LOAD_INDEX',
  SET_SELECTED_USER: 'admins/SET_SELECTED_USER',
  UNSET_SELECTED_USER: 'admins/UNSET_SELECTED_USER',
  PROMOTE: 'admins/PROMOTE',
  DEMOTE: 'admins/DEMOTE',
  RESET_PAGINATION: 'admins/RESET_PAGINATION',
};

export function getCollectionParams(majorId) {
  return {
    collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}

export const getPagingFns = prepareGetPagingFns(({ baseResourceId }) => (
  baseResourceId ? majorsPagingFns : platformPagingFns
));

export function loadAdmins(page = 1, majorId, query) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/admins` : '/users/admins',
      query: { page, ...query },
      urlParams: { page, ...query, ...getCollectionParams(majorId) },
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

export function promoteToAdmin(id, majorId) {
  const suffixUrl = `/users/${id}/admin`;

  return {
    type: TYPES.PROMOTE,
    payload: {
      method: 'POST',
      url: majorId ? `/majors/${majorId}${suffixUrl}` : suffixUrl,
      urlParams: { id, baseResourceId: majorId },
      responseSchema: usersSchema,
    },
  };
}

export function demoteFromAdmin(id, majorId) {
  const suffixUrl = `/users/${id}/admin`;

  return {
    type: TYPES.DEMOTE,
    payload: {
      method: 'DELETE',
      url: majorId ? `/majors/${majorId}${suffixUrl}` : suffixUrl,
      urlParams: { id, baseResourceId: majorId },
      responseSchema: usersSchema,
    },
  };
}

export const resetPagination = resetPaginationActionFactory(TYPES.RESET_PAGINATION);

function getUpdatingPath(majorId) {
  return majorId ? ['updatingMajorAdminsIds', String(majorId)] : ['updatingAdminsIds'];
}

export default function adminsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case TYPES.SET_SELECTED_USER:
      return state.set('selectedUserId', payload.id);
    case TYPES.UNSET_SELECTED_USER:
      return state.set('selectedUserId', undefined);
    case `${TYPES.PROMOTE}_PENDING`:
    case `${TYPES.DEMOTE}_PENDING`: {
      const { id, baseResourceId } = payload.urlParams;
      return state
        .updateIn(getUpdatingPath(baseResourceId), ids => (ids ? ids.add(id) : new Set([id])));
    }
    case `${TYPES.PROMOTE}_FULFILLED`:
    case `${TYPES.DEMOTE}_FULFILLED`: {
      const pageAction = type.includes(TYPES.PROMOTE) ? 'addToPage' : 'removeFromPage';

      const { urlParams } = payload.request;
      const { baseResourceId, id } = urlParams;
      return getPagingFns(payload)[pageAction](state, urlParams)
        .updateIn(getUpdatingPath(baseResourceId), ids => ids.delete(id));
    }
    case `${USERS_TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = payload.request;
      return removeFromAllPages(state, [majorsPagingFns, platformPagingFns], urlParams);
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

const getUpdatingAdminsIds = createSelector(
  getAdminsData,
  adminsData => adminsData.get('updatingAdminsIds'),
);

const getUpdatingMajorAdminsIds = createSelector(
  getAdminsData,
  adminsData => adminsData.get('updatingMajorAdminsIds'),
);

export const getIsAdminUpdating = createSelector(
  getUserId,
  getMajorId,
  getUpdatingAdminsIds,
  getUpdatingMajorAdminsIds,
  (userId, majorId, updatingAdminsIds, updatingMajorAdminsIds) => (
    majorId
      ? updatingMajorAdminsIds.hasIn([String(majorId), userId])
      : updatingAdminsIds.has(userId)
  ),
);
