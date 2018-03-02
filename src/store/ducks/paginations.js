/* eslint-disable import/prefer-default-export */
import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
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
  const getPage = (state, params) => params.page;

  const getPagedIds = createSelector(
    getBaseResourceId,
    getPage,
    dataSelector,
    (baseResourceId, page, data) => data.getIn([...pagingPath, baseResourceId, String(page)]),
  );

  return {
    getPagedEntities: createSelector(
      getPagedIds,
      getEntities,
      (ids, entities) => denormalize(ids, [schema], entities),
    ),

    getMeta: createSelector(
      getBaseResourceId,
      dataSelector,
      (baseResourceId, data) =>
        data.getIn([...metaPath, baseResourceId]),
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

    addToPagination(state, baseResourceId, id, page) {
      const setToAdd = new OrderedSet([id]);
      return state.updateIn(
        [...pagingPath, baseResourceId, String(page)],
        pages => (pages ? setToAdd.merge(pages) : setToAdd),
      );
    },
  };
}
