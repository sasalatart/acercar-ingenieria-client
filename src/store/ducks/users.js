import { combineReducers } from 'redux';
import { getIsRequestingFactory } from './loading';
import { getEntityFactory } from './entities';
import { fulfilledType, withFulfilledTypes } from './shared';
import paginationReducerFactory, { paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { usersSchema } from '../../schemas';
import collections from '../../lib/collections';

export const TYPES = withFulfilledTypes({
  LOAD_INDEX_FROM_PLATFORM: 'users/LOAD_INDEX_FROM_PLATFORM',
  LOAD_INDEX_FROM_MAJOR: 'users/LOAD_INDEX_FROM_MAJOR',
  LOAD: 'users/LOAD',
  DESTROY: 'users/DESTROY',
  RESET_PAGINATION: 'users/RESET_PAGINATION',
});

function getLoadIndexType(baseId) {
  return baseId ? TYPES.LOAD_INDEX_FROM_MAJOR : TYPES.LOAD_INDEX_FROM_PLATFORM;
}

function reducerFactory(setType) {
  return paginationReducerFactory({
    setPage: fulfilledType(setType),
    removeFromPages: TYPES.DESTROY_FULFILLED,
    resetPagination: TYPES.RESET_PAGINATION,
  });
}

export default combineReducers({
  platformPagination: reducerFactory(TYPES.LOAD_INDEX_FROM_PLATFORM),
  majorsPagination: reducerFactory(TYPES.LOAD_INDEX_FROM_MAJOR),
});

export function loadUsers({ baseId, query }) {
  const type = getLoadIndexType(baseId);
  const urlOptions = { collection: collections.users, baseCollection: collections.majors };
  const { loadIndex } = crudActionsFactory({ LOAD_INDEX: type }, usersSchema, urlOptions);
  return dispatch => dispatch(loadIndex({ baseId, query }));
}

export const {
  load: loadUser,
  destroy: destroyUser,
} = crudActionsFactory(TYPES, usersSchema);

export const resetPagination = () => ({ type: TYPES.RESET_PAGINATION });

const getUsersState = state => state.users;

export function getPaginationData(state, params) {
  return paginationDataSelectorFactory(
    getUsersState,
    params.baseId ? 'majorsPagination' : 'platformPagination',
    usersSchema,
  )(state, params);
}

export const getUserEntity = getEntityFactory(usersSchema);

export function getIsLoadingUsers(state, params) {
  const type = getLoadIndexType(params.baseId);
  return getIsRequestingFactory(type)(state, params);
}

export const getIsLoadingUser = getIsRequestingFactory(TYPES.LOAD);
export const getIsDestroyingUser = getIsRequestingFactory(TYPES.DESTROY);
