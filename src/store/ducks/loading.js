import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import { getPage } from './routes';

const INITIAL_STATE = new Map({
  fetching: new Map({}),
  updating: new Map({}),
  destroying: new Map({}),
});

function getCategory(fetching, updating, destroying) {
  if (fetching) return 'fetching';
  if (updating) return 'updating';
  if (destroying) return 'destroying';
  return undefined;
}

export default function loadingReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  const pending = type.includes('PENDING');
  const fulfilledOrRejected = type.match(/FULFILLED|REJECTED/g);

  if (!pending && !fulfilledOrRejected) {
    return state;
  }

  const fetching = type.includes('LOAD');
  const updating = type.includes('UPDATE');
  const destroying = type.includes('DESTROY');

  if (!fetching && !updating && !destroying) {
    return state;
  }

  const { urlParams } = pending ? action.payload : action.payload.request;
  const {
    id, collection, page, baseResourceName, baseResourceId, suffix,
  } = urlParams;

  if (fetching && page) {
    const path = compact(['fetching', 'pages', collection, baseResourceName || 'platform', baseResourceId, suffix]);
    return pending
      ? state.updateIn(path, pages => (pages ? pages.add(+page) : new Set([+page])))
      : state.updateIn(path, pages => pages && pages.delete(+page));
  }

  const path = compact([getCategory(fetching, updating, destroying), collection, suffix]);
  if (id) {
    return pending
      ? state.updateIn(path, ids => (ids ? ids.add(+id) : new Set([+id])))
      : state.updateIn(path, ids => ids && ids.delete(+id));
  }

  return state.setIn(path, pending);
}

export const getLoadingData = state => state.loading;

const getCollection = (state, params) => params.collection;
const getBaseResourceName = (state, params) => params.baseResourceName;
const getBaseResourceId = (state, params) => params.baseResourceId;
const getSuffix = (state, params) => params.suffix;
const getPaged = (state, params) => params.paged;
const getId = (state, params) => params.id;

export const getIsFetching = createSelector(
  getLoadingData,
  getCollection,
  getBaseResourceName,
  getBaseResourceId,
  getSuffix,
  getPaged,
  getPage,
  getId,
  (loadingData, collection, baseResourceName, baseResourceId, suffix, paged, page, id) => {
    const suffixPath = paged
      ? ['pages', collection, baseResourceName || 'platform', baseResourceId, suffix]
      : [collection, suffix];

    const path = compact(['fetching'].concat(suffixPath));

    if (id || paged) {
      const idOrPage = +id || +page || 1;
      const idsOrPages = loadingData.getIn(path);
      return !!(idsOrPages && idsOrPages.has(idOrPage));
    }

    return !!loadingData.getIn(path);
  },
);

function getIsChangingFactory(action) {
  return createSelector(
    getLoadingData,
    getCollection,
    getId,
    (loadingData, collection, id) => {
      if (!id) return !!loadingData.getIn([action, collection]);
      return (loadingData.getIn([action, collection]) || new Set([])).has(id);
    },
  );
}

export const getIsUpdating = getIsChangingFactory('updating');

export const getIsDestroying = getIsChangingFactory('destroying');
