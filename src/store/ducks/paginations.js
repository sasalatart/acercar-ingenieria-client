/* eslint-disable import/prefer-default-export */
import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import compact from 'lodash/compact';
import {
  addQueryToCurrentUri,
  getPage,
} from './routes';
import { getEntities } from './entities';

export default function pagingFnsFactory(resourceName, schema, options = {}) {
  const { baseResourceName, suffix } = options;

  const basePagingPath = ['pagination', baseResourceName || 'platform'];
  const pagingPath = basePagingPath.concat(suffix ? [suffix] : []);
  const metaPath = suffix
    ? basePagingPath.concat([`${suffix}Meta`])
    : ['pagination', `${baseResourceName || 'platform'}Meta`];

  // Selectors
  const getData = state => state[resourceName];
  const getParamsPage = (state, params = {}) => params.page;
  const getBaseResourceId = (state, params = {}) => params.baseResourceId;
  const getPagingPath = baseResourceId => compact([...pagingPath, baseResourceId]);
  const getMetaPath = baseResourceId => compact([...metaPath, baseResourceId]);

  const getPagedIds = createSelector(
    getBaseResourceId,
    getParamsPage,
    getPage,
    getData,
    (baseResourceId, paramsPage, page = 1, data) =>
      data.getIn([...getPagingPath(baseResourceId), String(paramsPage || page)]),
  );

  const getPagedEntities = createSelector(
    getPagedIds,
    getEntities,
    (ids, entities) => {
      const pagedEntities = denormalize(ids, [schema], entities);
      return pagedEntities ? pagedEntities.toJS() : undefined;
    },
  );

  const getMeta = createSelector(
    getBaseResourceId,
    getData,
    (baseResourceId, data) => {
      const meta = data.getIn(getMetaPath(baseResourceId));
      return Map.isMap(meta) ? undefined : meta;
    },
  );

  // Actions
  const addToPagination = (type, id, baseResourceId, addToEnd) =>
    (dispatch, getState) => {
      const state = getState();
      const currentPage = getPage(state) || 1;

      const { totalPages, totalRecords, perPage } = getMeta(state, { baseResourceId });

      const onFirstPage = currentPage === 1;
      const onLastPage = currentPage === totalPages;
      const newPageNeeded = totalRecords + 1 > perPage * totalPages;
      const localChange = (addToEnd && onLastPage && !newPageNeeded) || (!addToEnd && onFirstPage);

      if (localChange) {
        return dispatch({
          type,
          payload: {
            baseResourceName,
            baseResourceId,
            id,
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

  // Reducer Utils
  const setPage = (state, payload) => {
    const { pagination, result, request: { urlParams: { baseResourceId } } } = payload;

    const ids = new OrderedSet(result);
    return state
      .mergeIn(getPagingPath(baseResourceId), new Map({ [pagination.page]: ids }))
      .setIn(getMetaPath(baseResourceId), pagination);
  };

  const removeFromPage = (state, { id, baseResourceId }) => {
    const pages = state.getIn(getPagingPath(baseResourceId));
    if (!pages) return state;

    const pageIndex = pages.findKey(page => page.has(id));
    if (!pageIndex) return state;

    return state.updateIn([...getPagingPath(baseResourceId), pageIndex], ids => ids.delete(id));
  };

  const addToPage = (state, id, page, baseResourceId, addToEnd) => {
    const setToAdd = new OrderedSet([id]);
    return state.updateIn(
      [...getPagingPath(baseResourceId), String(page)],
      (ids) => {
        if (!ids) return setToAdd;
        return addToEnd ? ids.add(id) : setToAdd.merge(ids);
      },
    );
  };

  const reset = (state, baseResourceId) =>
    state
      .setIn(getPagingPath(baseResourceId), new Map({}))
      .removeIn(getMetaPath(baseResourceId));

  return {
    actions: {
      addToPagination,
    },

    selectors: {
      getPagedEntities,
      getMeta,
    },

    reducer: {
      setPage,
      removeFromPage,
      addToPage,
      reset,
    },
  };
}
