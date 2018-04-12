import { updateEntities, getEntity } from './entities';

export const collection = 'likes';

const TYPES = {
  CREATE_LIKE: 'likes/CREATE_LIKE',
  DESTROY_LIKE: 'likes/DESTROY_LIKE',
};

export function like(baseResourceName, baseResourceId) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.CREATE_LIKE,
      payload: {
        method: 'POST',
        url: `/${baseResourceName}/${baseResourceId}/likes`,
        urlParams: { baseResourceName, baseResourceId, collection },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collection: baseResourceName, id: baseResourceId });
      entity.likesCount += 1;
      entity.likedByCurrentUser = true;
      dispatch(updateEntities(collection, { [baseResourceId]: { ...entity } }));
    });
}

export function unlike(baseResourceName, baseResourceId) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.DESTROY_LIKE,
      payload: {
        method: 'DELETE',
        url: `/${baseResourceName}/${baseResourceId}/likes`,
        urlParams: { baseResourceName, baseResourceId, collection },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collection: baseResourceName, id: baseResourceId });
      entity.likesCount -= 1;
      entity.likedByCurrentUser = false;
      dispatch(updateEntities(collection, { [baseResourceId]: { ...entity } }));
    });
}
