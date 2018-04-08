import { updateEntities, getEntity } from './entities';

export const suffix = 'enrollments';

const TYPES = {
  CREATE_ENROLLMENT: 'enrollments/CREATE_ENROLLMENT',
  DESTROY_ENROLLMENT: 'enrollments/DESTROY_ENROLLMENT',
};

function toggleEnrollStatus(dispatch, getState, collection, id) {
  const entity = getEntity(getState(), { collection, id });
  entity.enrolledByCurrentUser = !entity.enrolledByCurrentUser;
  dispatch(updateEntities(collection, { [id]: { ...entity } }));
}

export function enroll(collection, id) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.CREATE_ENROLLMENT,
      payload: {
        method: 'POST',
        url: `/${collection}/${id}/enrollments`,
        urlParams: { collection, id, suffix },
      },
    }).then(() => {
      toggleEnrollStatus(dispatch, getState, collection, id);
    });
}

export function unenroll(collection, id) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.DESTROY_ENROLLMENT,
      payload: {
        method: 'DELETE',
        url: `/${collection}/${id}/enrollments`,
        urlParams: { collection, id, suffix },
      },
    }).then(() => {
      toggleEnrollStatus(dispatch, getState, collection, id);
    });
}
