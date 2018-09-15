import { combineReducers } from 'redux';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { TYPES as USERS_TYPES } from './users';
import { getIsRequestingFactory } from './loading';
import { getEntities } from './entities';
import { withFulfilledTypes } from './shared';
import paginationReducerFactory, { paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { usersSchema } from '../../schemas';
import { getToggleType } from '../../lib/admins';
import collections from '../../lib/collections';

const INITIAL_STATE = Map({
  selectedUserId: undefined,
});

const TYPES = withFulfilledTypes({
  FROM_PLATFORM: 'admins/FROM_PLATFORM',
  FROM_MAJOR: 'admins/FROM_MAJOR',
  SET_SELECTED_USER: 'admins/SET_SELECTED_USER',
  UNSET_SELECTED_USER: 'admins/UNSET_SELECTED_USER',
  PROMOTE_TO_PLATFORM: 'admins/PROMOTE_TO_PLATFORM',
  DEMOTE_FROM_PLATFORM: 'admins/DEMOTE_FROM_PLATFORM',
  PROMOTE_TO_MAJOR: 'admins/PROMOTE_TO_MAJOR',
  DEMOTE_FROM_MAJOR: 'admins/DEMOTE_FROM_MAJOR',
  RESET_PAGINATION: 'admins/RESET_PAGINATION',
});

function adminsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case TYPES.SET_SELECTED_USER:
      return state.set('selectedUserId', payload.id);
    case TYPES.UNSET_SELECTED_USER:
      return state.set('selectedUserId', undefined);
    default:
      return state;
  }
}

export default combineReducers({
  data: adminsReducer,
  platformPagination: paginationReducerFactory({
    setPage: TYPES.FROM_PLATFORM_FULFILLED,
    addToPage: TYPES.PROMOTE_TO_PLATFORM_FULFILLED,
    removeFromPages: [USERS_TYPES.DESTROY_FULFILLED, TYPES.DEMOTE_FROM_PLATFORM_FULFILLED],
    resetPagination: TYPES.RESET_PAGINATION,
  }),
  majorAdminsPagination: paginationReducerFactory({
    setPage: TYPES.FROM_MAJOR_FULFILLED,
    addToPage: TYPES.PROMOTE_TO_MAJOR_FULFILLED,
    removeFromPages: [USERS_TYPES.DESTROY_FULFILLED, TYPES.DEMOTE_FROM_MAJOR_FULFILLED],
    resetPagination: TYPES.RESET_PAGINATION,
  }),
});

export function loadAdmins({ baseId, query }) {
  const types = { LOAD_INDEX: baseId ? TYPES.FROM_MAJOR : TYPES.FROM_PLATFORM };
  const urlOptions = { collection: collections.admins, baseCollection: collections.majors };
  const { loadIndex } = crudActionsFactory(types, usersSchema, urlOptions);
  return dispatch => dispatch(loadIndex({ baseId, query }));
}

export function toggleAdmin(id, promote, baseId) {
  return {
    type: getToggleType(TYPES, promote, baseId),
    payload: {
      method: promote ? 'POST' : 'DELETE',
      url: baseId
        ? `/majors/${baseId}/users/${id}/admin`
        : `/users/${id}/admin`,
      responseSchema: usersSchema,
    },
    meta: {
      id,
      baseId,
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

export function resetPagination() {
  return {
    type: TYPES.RESET_PAGINATION,
  };
}

export const getAdminsState = state => state.admins;

export function getPaginationData(state, params) {
  return paginationDataSelectorFactory(
    getAdminsState,
    params.baseId ? 'majorAdminsPagination' : 'platformPagination',
    usersSchema,
  )(state, params);
}

export const getSelectedUserId = createSelector(
  getAdminsState,
  adminsState => adminsState.data.get('selectedUserId'),
);

export const getSelectedUserEntity = createSelector(
  getSelectedUserId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);

export function getIsLoadingAdmins(state, params) {
  const type = params.baseId ? TYPES.FROM_MAJOR : TYPES.FROM_PLATFORM;
  return getIsRequestingFactory(type)(state, params);
}

export function getIsTogglingAdmin(state, props) {
  const getIsPromoting = getIsRequestingFactory(getToggleType(TYPES, true, props.baseId));
  const getIsDemoting = getIsRequestingFactory(getToggleType(TYPES, false, props.baseId));
  return getIsPromoting(state, props) || getIsDemoting(state, props);
}
