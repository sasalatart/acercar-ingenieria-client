import { updateEntities, getEntity } from './entities';

export const suffix = 'likes';

const TYPES = {
  CREATE_LIKE: 'likes/CREATE_LIKE',
  DESTROY_LIKE: 'likes/DESTROY_LIKE',
};

export function like(collection, id) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.CREATE_LIKE,
      payload: {
        method: 'POST',
        url: `/${collection}/${id}/likes`,
        urlParams: { collection, id, suffix },
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
      type: TYPES.DESTROY_LIKE,
      payload: {
        method: 'DELETE',
        url: `/${collection}/${id}/likes`,
        urlParams: { collection, id, suffix },
      },
    }).then(() => {
      const entity = getEntity(getState(), { collection, id });
      entity.likesCount -= 1;
      entity.likedByCurrentUser = false;
      dispatch(updateEntities(collection, { [id]: { ...entity } }));
    });
}
