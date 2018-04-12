import { updateEntities, getEntity } from './entities';

export const collection = 'enrollments';

const TYPES = {
  CREATE_ENROLLMENT: 'enrollments/CREATE_ENROLLMENT',
  DESTROY_ENROLLMENT: 'enrollments/DESTROY_ENROLLMENT',
};

function toggleEnrollStatus(dispatch, getState, baseResourceName, baseResourceId) {
  const entity = getEntity(getState(), { collection: baseResourceName, id: baseResourceId });
  entity.enrolledByCurrentUser = !entity.enrolledByCurrentUser;
  dispatch(updateEntities(collection, { [baseResourceId]: { ...entity } }));
}

export function enroll(baseResourceName, baseResourceId) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.CREATE_ENROLLMENT,
      payload: {
        method: 'POST',
        url: `/${baseResourceName}/${baseResourceId}/enrollments`,
        urlParams: { baseResourceName, baseResourceId, collection },
      },
    }).then(() => {
      toggleEnrollStatus(dispatch, getState, baseResourceName, baseResourceId);
    });
}

export function unenroll(baseResourceName, baseResourceId) {
  return (dispatch, getState) =>
    dispatch({
      type: TYPES.DESTROY_ENROLLMENT,
      payload: {
        method: 'DELETE',
        url: `/${baseResourceName}/${baseResourceId}/enrollments`,
        urlParams: { baseResourceName, baseResourceId, collection },
      },
    }).then(() => {
      toggleEnrollStatus(dispatch, getState, baseResourceName, baseResourceId);
    });
}
