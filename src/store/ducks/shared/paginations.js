import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import compact from 'lodash/compact';
import { addQueryToCurrentUri, getSearch } from '../routes';
import { getEntities } from '../entities';

const DEFAULT_PAGINATION_INFO = {
  totalPages: 1, perPage: 25, totalRecords: 0, page: 1,
};

const getBaseId = (state, params = {}) => params.baseId;

function stringifiedCompact(toCompact) {
  return compact(toCompact).map(String);
}

function matchesType(type, actionType) {
  return type === actionType || (Array.isArray(actionType) && actionType.includes(type));
}

export default function paginationReducerFactory(actionTypes) {
  const INITIAL_STATE = new Map({});

  function processAction(payload = {}, meta = {}) {
    return {
      id: payload.id || meta.id || payload.result,
      ids: payload.ids || meta.ids || payload.result,
      baseId: payload.baseId || meta.baseId,
      page: payload.page || meta.page || 1,
    };
  }

  return function paginationReducer(state = INITIAL_STATE, { type, payload, meta }) {
    if (matchesType(type, actionTypes.setPage)) {
      const { ids, baseId } = processAction(payload, meta);
      const { paginationInfo } = payload;

      return state
        .setIn(stringifiedCompact([baseId, 'pages', paginationInfo.page]), new OrderedSet(ids))
        .setIn(stringifiedCompact([baseId, 'info']), new Map(paginationInfo));
    }

    if (matchesType(type, actionTypes.removeFromPages)) {
      const { id, baseId } = processAction(payload, meta);

      const noBaseId = state.has('pages');
      const targetBaseId = noBaseId
        ? undefined
        : baseId || state.findKey(dataForBaseId => !!dataForBaseId.get('pages').findKey(ids => ids.has(id)));
      if (!noBaseId && !targetBaseId) return state;

      const pages = state.getIn(stringifiedCompact([targetBaseId, 'pages']));
      if (!pages) return state;

      const pageNumber = pages.findKey(ids => ids.has(id));
      if (!pageNumber) return state;

      return state
        .updateIn(stringifiedCompact([targetBaseId, 'pages', pageNumber]), ids => ids.delete(id))
        .updateIn(stringifiedCompact([targetBaseId, 'info', 'totalRecords']), totalRecords => totalRecords - 1);
    }

    if (matchesType(type, actionTypes.addToPage)) {
      const { id, baseId, page } = processAction(payload, meta);
      return state
        .updateIn(stringifiedCompact([baseId, 'pages', page]), (ids) => {
          const toAdd = new OrderedSet([id]);
          if (!ids) return toAdd;
          return payload.addToEnd ? ids.merge(toAdd) : toAdd.merge(ids);
        })
        .updateIn(stringifiedCompact([baseId, 'info']), paginationInfo => (
          paginationInfo
            ? paginationInfo.update('totalRecords', totalRecords => totalRecords + 1)
            : new Map({ ...DEFAULT_PAGINATION_INFO, totalRecords: 1 })
        ));
    }

    return matchesType(type, actionTypes.resetPagination)
      ? INITIAL_STATE
      : state;
  };
}

export function addToPaginationActionFactory(type) {
  return function addToPagination(id, paginationInfo, { baseId, addToEnd } = {}) {
    return (dispatch) => {
      const {
        totalPages,
        totalRecords,
        perPage,
        page,
      } = paginationInfo;

      const onFirstPage = page === 1;
      const onLastPage = page === totalPages;
      const newPageNeeded = totalRecords + 1 > perPage * totalPages;
      const localChange = (addToEnd && onLastPage && !newPageNeeded) || (!addToEnd && onFirstPage);

      if (localChange) {
        return dispatch({
          type,
          payload: {
            id,
            baseId,
            page: addToEnd ? totalPages : 1,
            addToEnd,
          },
        });
      }

      if (addToEnd) {
        const toPage = newPageNeeded ? totalPages + 1 : totalPages;
        return dispatch(addQueryToCurrentUri({ page: toPage }));
      }

      return dispatch(addQueryToCurrentUri({ page: 1 }));
    };
  };
}

export function paginationDataSelectorFactory(getData, key, schema) {
  const getPagination = createSelector(
    getData,
    data => data[key],
  );

  const getCurrentPage = createSelector(
    getSearch,
    search => +(URI.parseQuery(search).page) || 1,
  );

  const getPaginationInfo = createSelector(
    getPagination,
    getBaseId,
    getCurrentPage,
    (pagination, baseId, page) => {
      const paginationInfo = pagination && pagination.getIn(stringifiedCompact([baseId, 'info']));
      return paginationInfo ? { ...paginationInfo.toJS(), page } : DEFAULT_PAGINATION_INFO;
    },
  );

  const getPagedIds = createSelector(
    getPagination,
    getBaseId,
    getCurrentPage,
    (pagination, baseId, currentPage) => {
      const pages = pagination && pagination.getIn(stringifiedCompact([baseId, 'pages']));
      return pages && pages.toJS()[currentPage];
    },
  );

  const getPagedEntities = createSelector(
    getPagedIds,
    getEntities,
    (pagedIds, entities) => (pagedIds ? denormalize(pagedIds, [schema], entities) : []),
  );

  return (state, params) => {
    const paginationInfo = getPaginationInfo(state, params);
    const pagedEntities = getPagedEntities(state, { ...params, page: paginationInfo.page });
    return {
      paginationInfo,
      pagedEntities,
    };
  };
}
