import { getIsRequestingFactory } from './loading';
import { updateEntity } from './entities';

const TYPES = {
  articles: 'enrollments/TOGGLE_ARTICLE_ENROLLMENT',
  discussions: 'enrollments/TOGGLE_DISCUSSION_ENROLLMENT',
  comments: 'enrollments/TOGGLE_COMMENT_ENROLLMENT',
};

export function enrollingFactory(enrolling) {
  return (baseCollection, baseId) =>
    dispatch =>
      dispatch({
        type: TYPES[baseCollection],
        payload: {
          method: enrolling ? 'POST' : 'DELETE',
          url: `/${baseCollection}/${baseId}/enrollments`,
        },
        meta: { baseId },
      }).then(() =>
        dispatch(updateEntity(baseCollection, baseId, entity => ({
          ...entity,
          enrolledByCurrentUser: !entity.enrolledByCurrentUser,
        }))));
}

export const enroll = enrollingFactory(true);
export const unenroll = enrollingFactory(false);

export function getIsTogglingEnrollment(state, params) {
  return getIsRequestingFactory(TYPES[params.baseCollection])(state, params);
}
