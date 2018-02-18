import { createSelector } from 'reselect';
import { majorsSchema } from '../../schemas';
import { getEntities } from './entities';
import { majorEditedNotification } from './notifications';
import { changeMajorTab } from '../../routes';

export const TYPES = {
  LOAD: 'fetch::majors/LOAD',
  UPDATE: 'fetch::majors/UPDATE',
};

export function loadMajors() {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: '/majors',
      responseSchema: [majorsSchema],
    },
  };
}

export function loadMajor(majorId) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/majors/${majorId}`,
      responseSchema: majorsSchema,
    },
  };
}

export function updateMajor(majorId, body) {
  return dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: `/majors/${majorId}`,
        body,
        responseSchema: majorsSchema,
      },
    }).then(() => {
      dispatch(majorEditedNotification());
      dispatch(changeMajorTab(majorId));
    });
}

export const getMajorId = (state, params) => params.majorId;

export const getMajorEntities = createSelector(
  getEntities,
  entities => entities.get('majors'),
);

export const getMajorEntity = createSelector(
  getMajorId,
  getMajorEntities,
  (majorId, majorEntities) => majorEntities.get(majorId),
);

function filterByCategory(majorEntities, categoryType) {
  return majorEntities
    .toList()
    .filter(({ category }) => category === categoryType);
}

export const getDisciplinaryMajors = createSelector(
  getMajorEntities,
  majorEntities => filterByCategory(majorEntities, 'disciplinary'),
);

export const getInterdisciplinaryMajors = createSelector(
  getMajorEntities,
  majorEntities => filterByCategory(majorEntities, 'interdisciplinary'),
);
