import { updateEntity } from './entities';
import { enrollmentsCollection as collection } from '../../lib/collections';

const TYPES = {
  CREATE_ENROLLMENT: 'enrollments/CREATE_ENROLLMENT',
  DESTROY_ENROLLMENT: 'enrollments/DESTROY_ENROLLMENT',
};

export function enrollingFactory(enrolling) {
  return (baseResourceName, baseResourceId) =>
    dispatch =>
      dispatch({
        type: enrolling ? TYPES.CREATE_ENROLLMENT : TYPES.DESTROY_ENROLLMENT,
        payload: {
          method: enrolling ? 'POST' : 'DELETE',
          url: `/${baseResourceName}/${baseResourceId}/enrollments`,
          fetchParams: { baseResourceName, baseResourceId, collection },
        },
      }).then(() => {
        const updateFn = entity => ({
          ...entity,
          enrolledByCurrentUser: !entity.enrolledByCurrentUser,
        });
        return dispatch(updateEntity(baseResourceName, baseResourceId, updateFn));
      });
}

export const enroll = enrollingFactory(true);

export const unenroll = enrollingFactory(false);
