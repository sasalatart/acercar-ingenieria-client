import { getIsRequestingFactory } from './loading';
import { updateEntity } from './entities';

const TYPES = {
  articles: 'likes/TOGGLE_ARTICLE_LIKE',
  discussions: 'likes/TOGGLE_DISCUSSION_LIKE',
  comments: 'likes/TOGGLE_COMMENT_LIKE',
};

function likingFactory(liking) {
  return (baseCollection, baseId) =>
    dispatch =>
      dispatch({
        type: TYPES[baseCollection],
        payload: {
          method: liking ? 'POST' : 'DELETE',
          url: `/${baseCollection}/${baseId}/likes`,
        },
        meta: { baseId },
      }).then(() =>
        dispatch(updateEntity(baseCollection, baseId, entity => ({
          ...entity,
          likesCount: entity.likesCount + (liking ? 1 : -1),
          likedByCurrentUser: liking,
        }))));
}

export const like = likingFactory(true);
export const unlike = likingFactory(false);

export function getIsTogglingLike(state, params) {
  return getIsRequestingFactory(TYPES[params.baseCollection])(state, params);
}
