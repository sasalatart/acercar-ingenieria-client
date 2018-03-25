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

  const getData = state => state[resourceName];
  const getBaseResourceId = (state, params = {}) => params.baseResourceId;
  const getPagingPath = baseResourceId => compact([...pagingPath, baseResourceId]);
  const getMetaPath = baseResourceId => compact([...metaPath, baseResourceId]);

  const getPagedIds = createSelector(
    getBaseResourceId,
    getPage,
    getData,
    (baseResourceId, page = 1, data) =>
      data.getIn([...getPagingPath(baseResourceId), String(page)]),
  );

  return {
    actions: {
      addToPage(type, id, page, baseResourceId) {
        return (dispatch, getState) => {
          const currentPage = getPage(getState()) || 1;

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
            },
          });
        };
      },
    },

    selectors: {
      getPagedEntities: createSelector(
        getPagedIds,
        getEntities,
        (ids, entities) => {
          const pagedEntities = denormalize(ids, [schema], entities);
          return pagedEntities ? pagedEntities.toJS() : undefined;
        },
      ),

      getMeta: createSelector(
        getBaseResourceId,
        getData,
        (baseResourceId, data) => {
          const meta = data.getIn(getMetaPath(baseResourceId));
          return Map.isMap(meta) ? undefined : meta;
        },
      ),
    },

    reducer: {
      setPage(state, payload) {
        const { pagination, result, request: { urlParams: { baseResourceId } } } = payload;

        const ids = new OrderedSet(result);
        return state
          .mergeIn(getPagingPath(baseResourceId), new Map({ [pagination.page]: ids }))
          .setIn(getMetaPath(baseResourceId), pagination);
      },

      removeFromPage(state, { id, baseResourceId }) {
        const pages = state.getIn(getPagingPath(baseResourceId));
        if (!pages) return state;

        const pageIndex = pages.findKey(page => page.has(id));
        if (!pageIndex) return state;

        return state.updateIn([...getPagingPath(baseResourceId), pageIndex], ids => ids.delete(id));
      },

      addToPage(state, id, page, baseResourceId) {
        const setToAdd = new OrderedSet([id]);
        return state.updateIn(
          [...getPagingPath(baseResourceId), String(page)],
          pages => (pages ? setToAdd.merge(pages) : setToAdd),
        );
      },

      reset(state, baseResourceId) {
        return state
          .setIn(getPagingPath(baseResourceId), new Map({}))
          .removeIn(getMetaPath(baseResourceId));
      },
    },
  };
}
