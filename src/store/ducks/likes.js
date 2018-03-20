import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { updateEntities, getEntity } from './entities';

const INITIAL_STATE = new Map({
  loadingResources: new Map(),
});

const TYPES = {
  LIKE: 'likes/LIKE',
  UNLIKE: 'likes/UNLIKE',
};

export function like(collection, id) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.LIKE,
      payload: {
        method: 'POST',
        url: `/${collection}/${id}/likes`,
        urlParams: { collection, id },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collection, id });
      entity.likesCount += 1;
      entity.likedByCurrentUser = true;
      dispatch(updateEntities(collection, { [id]: { ...entity } }));
    });
}

export function unlike(collection, id) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.UNLIKE,
      payload: {
        method: 'DELETE',
        url: `/${collection}/${id}/likes`,
        urlParams: { collection, id },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collection, id });
      entity.likesCount -= 1;
      entity.likedByCurrentUser = false;
      dispatch(updateEntities(collection, { [id]: { ...entity } }));
    });
}

function removeIdFromLoadingSet(state, { collection, id }) {
  return state.updateIn(
    ['loadingResources', collection],
    ids => ids.delete(id),
  );
}

function addIdToLoadingSet(state, { collection, id }) {
  return state.updateIn(
    ['loadingResources', collection],
    ids => (ids ? ids.add(id) : new Set([id])),
  );
}

export default function likesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LIKE}_PENDING`:
    case `${TYPES.UNLIKE}_PENDING`:
      return addIdToLoadingSet(state, action.payload.urlParams);
    case `${TYPES.LIKE}_FULFILLED`:
    case `${TYPES.UNLIKE}_FULFILLED`:
      return removeIdFromLoadingSet(state, action.payload.request.urlParams);
    default:
      return state;
  }
}

const getLikesData = state => state.likes;

const getCollection = (state, params) => params.collection;

const getId = (state, params) => params.id;

const getLoadingIdsForCollection = createSelector(
  getLikesData,
  getCollection,
  (likesData, collectionName) => likesData.getIn(['loadingResources', collectionName]) || Set(),
);

export const getResourceLikeLoading = createSelector(
  getLoadingIdsForCollection,
  getId,
  (loadingIds, baseResourceId) => loadingIds.has(baseResourceId),
);
