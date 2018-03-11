/* eslint-disable import/prefer-default-export */
import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import {
  addQueryToCurrentUri,
  getPage,
} from './routes';
import { getEntities } from './entities';

export function getBaseResourceIdName(baseResourceName) {
  return `${baseResourceName.slice(0, -1)}Id`;
}

export function nestedPagingFnsFactory(resourceName, schema, baseResourceName, suffix) {
  const basePagingPath = ['pagination', baseResourceName];
  const pagingPath = basePagingPath.concat(suffix ? [suffix] : []);
  const metaPath = suffix
    ? basePagingPath.concat([`${suffix}Meta`])
    : ['pagination', `${baseResourceName}Meta`];

  const baseResourceIdName = getBaseResourceIdName(baseResourceName);
  const dataSelector = state => state[resourceName];
  const getBaseResourceId = (state, params) => params[baseResourceIdName];

  const getPagedIds = createSelector(
    getBaseResourceId,
    getPage,
    dataSelector,
    (baseResourceId, page, data) =>
      data.getIn([...pagingPath, baseResourceId, String(page)]),
  );

  return {
    addToPaginationAction(type, id, page, baseResourceId, suffixPayload) {
      return (dispatch, getState) => {
        const currentPage = getPage(getState());

        if (currentPage && currentPage !== page) {
          dispatch(addQueryToCurrentUri({ page }));
        }

        return dispatch({
          type,
          payload: {
            baseResourceName,
            baseResourceId,
            id,
            page,
            ...suffixPayload,
          },
        });
      };
    },

    getPagedEntities: createSelector(
      getPagedIds,
      getEntities,
      (ids, entities) => denormalize(ids, [schema], entities),
    ),

    getMeta: createSelector(
      getBaseResourceId,
      dataSelector,
      (baseResourceId, data) => {
        const meta = data.getIn([...metaPath, baseResourceId]);
        return Map.isMap(meta) ? undefined : meta;
      },
    ),

    update: (state, payload) => {
      const { pagination, result, request: { urlParams } } = payload;
      const baseResourceId = urlParams[baseResourceIdName];

      const ids = new OrderedSet(result);
      return state
        .mergeIn([...pagingPath, baseResourceId], new Map({ [pagination.page]: ids }))
        .setIn([...metaPath, baseResourceId], pagination);
    },

    destroy: (state, urlParams) => {
      const { id } = urlParams;
      const baseResourceId = urlParams[baseResourceIdName];

      const pages = state.getIn([...pagingPath, baseResourceId]);
      if (!pages) return state;

      const pageIndex = pages.findKey(page => page.has(id));
      if (!pageIndex) return state;

      return state.updateIn([...pagingPath, baseResourceId, pageIndex], ids => ids.delete(id));
    },

    addToPagination(state, id, page, baseResourceId) {
      const setToAdd = new OrderedSet([id]);
      return state.updateIn(
        [...pagingPath, baseResourceId, String(page)],
        pages => (pages ? setToAdd.merge(pages) : setToAdd),
      );
    },
  };
}

export function pagingFnsFactory(resourceName, schema, suffix) {
  const basePagingPath = ['pagination', 'platform'];
  const pagingPath = ['pagination', 'platform'].concat(suffix ? [suffix] : []);

  const metaPath = suffix
    ? basePagingPath.concat([`${suffix}Meta`])
    : ['pagination', 'platformMeta'];

  const dataSelector = state => state[resourceName];

  const getPagedIds = createSelector(
    getPage,
    dataSelector,
    (page, data) => data.getIn([...pagingPath, String(page)]),
  );

  return {
    addToPaginationAction(type, id, page, suffixPayload) {
      return (dispatch, getState) => {
        const currentPage = getPage(getState());

        if (currentPage && currentPage !== page) {
          dispatch(addQueryToCurrentUri({ page }));
        }

        return dispatch({
          type,
          payload: {
            id,
            page,
            ...suffixPayload,
          },
        });
      };
    },

    getPagedEntities: createSelector(
      getPagedIds,
      getEntities,
      (ids, entities) => denormalize(ids, [schema], entities),
    ),

    getMeta: createSelector(
      dataSelector,
      (data) => {
        const meta = data.getIn(metaPath);
        return Map.isMap(meta) ? undefined : meta;
      },
    ),

    update: (state, { pagination, result }) =>
      state
        .mergeIn(pagingPath, new Map({ [pagination.page]: new OrderedSet(result) }))
        .setIn(metaPath, pagination),

    destroy: (state, urlParams) => {
      const { id } = urlParams;
      const pages = state.getIn(pagingPath);
      if (!pages) return state;

      const pageIndex = pages.findKey(page => page.has(id));
      if (!pageIndex) return state;

      return state.updateIn([...pagingPath, pageIndex], ids => ids.delete(id));
    },

    addToPagination(state, id, page) {
      const setToAdd = new OrderedSet([id]);
      return state.updateIn(
        [...pagingPath, String(page)],
        pages => (pages ? setToAdd.merge(pages) : setToAdd),
      );
    },
  };
}
