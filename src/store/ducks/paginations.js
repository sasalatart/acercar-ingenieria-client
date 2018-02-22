/* eslint-disable import/prefer-default-export */
import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';

export function majorPaging(dataSelector, schema, partialPagingPath, partialMetaPath) {
  const basePagingPath = ['pagination', 'majors'];

  const pagingPath = partialPagingPath
    ? [...basePagingPath, ...partialPagingPath]
    : basePagingPath;

  const metaPath = partialMetaPath
    ? [...basePagingPath, ...partialMetaPath]
    : ['pagination', 'majorsMeta'];

  const getMajorId = (state, params) => params.majorId;
  const getPage = (state, params) => params.page;

  const getPagedIds = createSelector(
    getMajorId,
    getPage,
    dataSelector,
    (majorId, page, data) => data.getIn([...pagingPath, majorId, String(page)]),
  );

  return {
    getPagedEntities: createSelector(
      getPagedIds,
      getEntities,
      (ids, entities) => denormalize(ids, [schema], entities),
    ),

    getMeta: createSelector(
      getMajorId,
      dataSelector,
      (majorId, data) => data.getIn([...metaPath, majorId]),
    ),

    update: (state, payload) => {
      const { pagination, result, request: { urlParams: { majorId } } } = payload;
      return state
        .mergeIn([...pagingPath, majorId], new Map({ [pagination.page]: new OrderedSet(result) }))
        .setIn([...metaPath, majorId], pagination);
    },

    destroy: (state, { id, majorId, page }) => {
      return state.updateIn(
        [...pagingPath, majorId, String(page)],
        pagedData => pagedData.delete(id),
      );
    },
  };
}
