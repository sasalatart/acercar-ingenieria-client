import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import keyMirror from 'keymirror';
import { getPage } from './routes';
import { BASE_RESOURCE_NAME_FALLBACK } from './paginations';

const INITIAL_STATE = new Map({
  fetching: new Map({}),
  creating: new Map({}),
  updating: new Map({}),
  destroying: new Map({}),
});

const CATEGORIES = keyMirror({
  fetching: null,
  creating: null,
  updating: null,
  destroying: null,
});

function getCategory(fetching, creating, updating, destroying) {
  if (fetching) return CATEGORIES.fetching;
  if (creating) return CATEGORIES.creating;
  if (updating) return CATEGORIES.updating;
  if (destroying) return CATEGORIES.destroying;
  return undefined;
}

function getPath(category, paged, collection, baseResourceName, baseResourceId, suffix) {
  return compact([
    category,
    paged ? 'pages' : undefined,
    collection,
    baseResourceId ? baseResourceName : BASE_RESOURCE_NAME_FALLBACK,
    baseResourceId,
    suffix,
  ]);
}

export default function loadingReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  const pending = type.includes('PENDING');
  const fulfilledOrRejected = type.match(/FULFILLED|REJECTED/g);

  if (!pending && !fulfilledOrRejected) {
    return state;
  }

  const fetching = type.includes('LOAD');
  const creating = type.includes('CREATE');
  const updating = type.includes('UPDATE');
  const destroying = type.includes('DESTROY');

  if (!fetching && !creating && !updating && !destroying) {
    return state;
  }

  const { fetchParams } = pending ? action.payload : action.payload.request;
  const {
    id, collection, page, baseResourceName, baseResourceId, suffix,
  } = fetchParams;

  const category = getCategory(fetching, creating, updating, destroying);
  const paged = fetching && page;
  const path = getPath(category, paged, collection, baseResourceName, baseResourceId, suffix);

  if (fetching && page) {
    return pending
      ? state.updateIn(path, pages => (pages ? pages.add(+page) : new Set([+page])))
      : state.updateIn(path, pages => pages && pages.delete(+page));
  }

  if (id || baseResourceId) {
    const effectiveId = id || baseResourceId;
    return pending
      ? state.updateIn(path, ids => (ids ? ids.add(+effectiveId) : new Set([+effectiveId])))
      : state.updateIn(path, ids => ids && ids.delete(+effectiveId));
  }

  return pending
    ? state.setIn(path, pending)
    : state.deleteIn(path);
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
    const category = CATEGORIES.fetching;
    const path = getPath(category, paged, collection, baseResourceName, baseResourceId, suffix);

    if (id || paged) {
      const idOrPage = +id || +page || 1;
      const idsOrPages = loadingData.getIn(path);
      return !!(idsOrPages && idsOrPages.has(idOrPage));
    }

    return !!loadingData.getIn(path);
  },
);

function getIsChangingFactory(category) {
  return createSelector(
    getLoadingData,
    getBaseResourceName,
    getBaseResourceId,
    getCollection,
    getId,
    getSuffix,
    (loadingData, baseResourceName, baseResourceId, collection, id, suffix) => {
      const path = getPath(category, false, collection, baseResourceName, baseResourceId, suffix);
      const effectiveId = id || baseResourceId;
      if (!effectiveId) return !!loadingData.getIn(path);
      return (loadingData.getIn(path) || new Set([])).has(effectiveId);
    },
  );
}

export const getIsCreating = getIsChangingFactory(CATEGORIES.creating);

export const getIsUpdating = getIsChangingFactory(CATEGORIES.updating);

export const getIsDestroying = getIsChangingFactory(CATEGORIES.destroying);
