import { createSelector } from 'reselect';
import { majorsSchema } from '../../schemas';
import { getEntities } from './entities';

export const TYPES = {
  LOAD: 'fetch::majors/LOAD',
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
