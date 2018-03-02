import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { updateEntities, getEntity } from './entities';

const INITIAL_STATE = new Map({
  likingResources: new Map(),
  unlikingResources: new Map(),
});

const TYPES = {
  LIKE: 'fetch::likes/LIKE',
  UNLIKE: 'fetch::likes/UNLIKE',
  SET_LIKING_RESOURCE: 'likes/SET_LIKING_RESOURCE',
  SET_UNLIKING_RESOURCE: 'likes/SET_UNLIKING_RESOURCE',
};

function setLoadingResourceFactory(type) {
  return (collectionName, resourceId) => ({
    type,
    payload: {
      collectionName,
      resourceId,
    },
  });
}

const setLikingResource = setLoadingResourceFactory(TYPES.SET_LIKING_RESOURCE);

const setUnlikingResource = setLoadingResourceFactory(TYPES.SET_UNLIKING_RESOURCE);

export function like(collectionName, resourceId) {
  return (dispatch, getState) => {
    dispatch(setLikingResource(collectionName, resourceId));
    return dispatch({
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
  };
}

export function unlike(collectionName, resourceId) {
  return (dispatch, getState) => {
    dispatch(setUnlikingResource(collectionName, resourceId));
    return dispatch({
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
  };
}

function removeIdFromLoadingSet(state, loadingSetName, payload) {
  const { collectionName, resourceId } = payload.request.urlParams;
  return state.updateIn([loadingSetName, collectionName], ids => ids.delete(resourceId));
}

function addIdToLoadingSet(state, loadingSetName, { collectionName, resourceId }) {
  return state.updateIn(
    [loadingSetName, collectionName],
    ids => (ids ? ids.add(resourceId) : new Set([resourceId])),
  );
}

export default function likesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LIKE}_FULFILLED`:
      return removeIdFromLoadingSet(state, 'likingResources', action.payload);
    case `${TYPES.UNLIKE}_FULFILLED`:
      return removeIdFromLoadingSet(state, 'unlikingResources', action.payload);
    case TYPES.SET_LIKING_RESOURCE:
      return addIdToLoadingSet(state, 'likingResources', action.payload);
    case TYPES.SET_UNLIKING_RESOURCE:
      return addIdToLoadingSet(state, 'unlikingResources', action.payload);
    default:
      return state;
  }
}

const getLikesData = state => state.likes;

const getCollectionName = (state, params) => params.collectionName;

const getResourceId = (state, params) => params.resourceId;

const getLikingIdsForCollection = createSelector(
  getLikesData,
  getCollectionName,
  (likesData, collectionName) => likesData.getIn(['likingResources', collectionName]) || Set(),
);

const getUnlikingIdsForCollection = createSelector(
  getLikesData,
  getCollectionName,
  (likesData, collectionName) => likesData.getIn(['unlikingResources', collectionName]) || Set(),
);

export const getResourceLikeLoading = createSelector(
  getLikingIdsForCollection,
  getUnlikingIdsForCollection,
  getResourceId,
  (likingIds, unlikingIds, resourceId) => likingIds.has(resourceId) || unlikingIds.has(resourceId),
);
