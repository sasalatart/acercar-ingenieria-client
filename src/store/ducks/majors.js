import { createSelector } from 'reselect';
import { majorsSchema } from '../../schemas';
import { goToMajor } from './routes';
import { getEntities } from './entities';
import { majorEditedNotification } from './notifications';

export const TYPES = {
  LOAD: 'fetch::majors/LOAD',
  UPDATE: 'fetch::majors/UPDATE',
  SET_TAB: 'majors/SET_TAB',
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
      dispatch(goToMajor(majorId));
    });
}

export const getMajorsData = state => state.majors;

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

export const getMajorOptions = createSelector(
  getMajorEntities,
  majorEntities => ([
    { key: 0, value: null, label: 'None' },
    ...majorEntities.toArray().map(({ id, name }) => ({ key: id, value: id, label: name })),
  ]),
);
