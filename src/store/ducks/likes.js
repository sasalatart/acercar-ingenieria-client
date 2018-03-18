import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { updateEntities, getEntity } from './entities';

const INITIAL_STATE = new Map({
  loadingResources: new Map(),
});

const TYPES = {
  LIKE: 'fetch::likes/LIKE',
  UNLIKE: 'fetch::likes/UNLIKE',
};

export function like(collectionName, resourceId) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.LIKE,
      payload: {
        method: 'POST',
        url: `/${collectionName}/${resourceId}/likes`,
        urlParams: { collectionName, resourceId },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collectionName, resourceId });
      entity.likesCount += 1;
      entity.likedByCurrentUser = true;
      dispatch(updateEntities(collectionName, { [resourceId]: { ...entity } }));
    });
}

export function unlike(collectionName, resourceId) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.UNLIKE,
      payload: {
        method: 'DELETE',
        url: `/${collectionName}/${resourceId}/likes`,
        urlParams: { collectionName, resourceId },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collectionName, resourceId });
      entity.likesCount -= 1;
      entity.likedByCurrentUser = false;
      dispatch(updateEntities(collectionName, { [resourceId]: { ...entity } }));
    });
}

function removeIdFromLoadingSet(state, { collectionName, resourceId }) {
  return state.updateIn(
    ['loadingResources', collectionName],
    ids => ids.delete(resourceId),
  );
}

function addIdToLoadingSet(state, { collectionName, resourceId }) {
  return state.updateIn(
    ['loadingResources', collectionName],
    ids => (ids ? ids.add(resourceId) : new Set([resourceId])),
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

const getCollectionName = (state, params) => params.collectionName;

const getResourceId = (state, params) => params.resourceId;

const getLoadingIdsForCollection = createSelector(
  getLikesData,
  getCollectionName,
  (likesData, collectionName) => likesData.getIn(['loadingResources', collectionName]) || Set(),
);

export const getResourceLikeLoading = createSelector(
  getLoadingIdsForCollection,
  getResourceId,
  (loadingIds, resourceId) => loadingIds.has(resourceId),
);
