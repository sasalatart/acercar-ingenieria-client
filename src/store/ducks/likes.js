import { updateEntity } from './entities';

export const collection = 'likes';

const TYPES = {
  CREATE_LIKE: 'likes/CREATE_LIKE',
  DESTROY_LIKE: 'likes/DESTROY_LIKE',
};

function likingFactory(liking) {
  return (baseResourceName, baseResourceId) =>
    dispatch =>
      dispatch({
        type: liking ? TYPES.CREATE_LIKE : TYPES.DESTROY_LIKE,
        payload: {
          method: liking ? 'POST' : 'DELETE',
          url: `/${baseResourceName}/${baseResourceId}/likes`,
          urlParams: { baseResourceName, baseResourceId, collection },
        },
      }).then(() => {
        const updateFn = entity => ({
          ...entity,
          likesCount: entity.likesCount + (liking ? 1 : -1),
          likedByCurrentUser: liking,
        });
        return dispatch(updateEntity(baseResourceName, baseResourceId, updateFn));
      });
}

export const like = likingFactory(true);

export const unlike = likingFactory(false);
