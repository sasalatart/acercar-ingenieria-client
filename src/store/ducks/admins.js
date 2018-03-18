import { Map, Set } from 'immutable';
import URI from 'urijs';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { usersSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory from './paginations';
import { TYPES as USERS_TYPES } from './users';

const commonArgs = ['admins', usersSchema];
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
  LOAD: 'fetch::admins/LOAD',
  SET_SELECTED_USER: 'admins/SET_SELECTED_USER',
  UNSET_SELECTED_USER: 'admins/UNSET_SELECTED_USER',
  PROMOTE_TO_PLATFORM: 'fetch::admins/PROMOTE_TO_PLATFORM',
  PROMOTE_TO_MAJOR: 'fetch::admins/PROMOTE_TO_MAJOR',
  DEMOTE_FROM_PLATFORM: 'fetch::admins/DEMOTE_FROM_PLATFORM',
  DEMOTE_FROM_MAJOR: 'fetch::admins/DEMOTE_FROM_MAJOR',
};

export function getPagingFns(isOfMajor) {
  return isOfMajor ? majorsPagingFns : platformPagingFns;
}

export function loadAdmins(page, majorId) {
  const baseUrl = majorId ? `/majors/${majorId}/admins` : 'users/admins';

  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: URI(baseUrl).query({ page }).toString(),
      urlParams: { page, majorId },
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
    type: majorId ? TYPES.PROMOTE_TO_MAJOR : TYPES.PROMOTE_TO_PLATFORM,
    payload: {
      method: 'POST',
      url: majorId ? `/majors/${majorId}${suffixUrl}` : suffixUrl,
      urlParams: { id, majorId },
      responseSchema: usersSchema,
    },
  };
}

export function demoteFromAdmin(id, majorId) {
  const suffixUrl = `/users/${id}/admin`;

  return {
    type: majorId ? TYPES.DEMOTE_FROM_MAJOR : TYPES.DEMOTE_FROM_PLATFORM,
    payload: {
      method: 'DELETE',
      url: majorId ? `/majors/${majorId}${suffixUrl}` : suffixUrl,
      urlParams: { id, majorId },
      responseSchema: usersSchema,
    },
  };
}

export default function adminsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(majorId).reducer.setPage(state, action.payload);
    }
    case TYPES.SET_SELECTED_USER:
      return state.set('selectedUserId', action.payload.id);
    case TYPES.UNSET_SELECTED_USER:
      return state.set('selectedUserId', undefined);
    case `${TYPES.PROMOTE_TO_PLATFORM}_PENDING`:
    case `${TYPES.PROMOTE_TO_MAJOR}_PENDING`:
    case `${TYPES.DEMOTE_FROM_PLATFORM}_PENDING`:
    case `${TYPES.DEMOTE_FROM_MAJOR}_PENDING`: {
      const { id, majorId } = action.payload.urlParams;
      const path = majorId ? ['updatingMajorAdminsIds', String(majorId)] : ['updatingAdminsIds'];
      return state.updateIn(path, ids => (ids ? ids.add(id) : new Set([id])));
    }
    case `${TYPES.PROMOTE_TO_PLATFORM}_FULFILLED`:
    case `${TYPES.PROMOTE_TO_MAJOR}_FULFILLED`: {
      const { id, majorId } = action.payload.request.urlParams;
      const path = majorId ? ['updatingMajorAdminsIds', String(majorId)] : ['updatingAdminsIds'];
      return getPagingFns(majorId)
        .reducer
        .addToPage(state, id, 1, majorId)
        .updateIn(path, ids => ids.delete(id));
    }
    case `${TYPES.DEMOTE_FROM_PLATFORM}_FULFILLED`:
    case `${TYPES.DEMOTE_FROM_MAJOR}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const { id, majorId } = urlParams;
      const path = majorId ? ['updatingMajorAdminsIds', String(majorId)] : ['updatingAdminsIds'];
      return getPagingFns(majorId)
        .reducer
        .removeFromPage(state, urlParams)
        .updateIn(path, ids => ids.delete(id));
    }
    case `${USERS_TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromMajors = majorsPagingFns.reducer.removeFromPage(state, urlParams);
      return platformPagingFns.reducer.removeFromPage(fromMajors, urlParams);
    }
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

const getUserId = (state, params) => params.userId;
const getMajorId = (state, params) => params.majorId;

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
