import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { majorsSchema } from '../../schemas';
import { goToMajor } from './routes';
import {
  removeEntity,
  getEntities,
} from './entities';
import { resourceSuccessNotification } from './notifications';

const INITIAL_STATE = new Map({
  activeIds: new Set(),
  destroyingIds: new Set(),
});

export const TYPES = {
  LOAD_INDEX: 'fetch::majors/LOAD_INDEX',
  LOAD: 'fetch::majors/LOAD',
  CREATE: 'fetch::majors/CREATE',
  UPDATE: 'fetch::majors/UPDATE',
  DESTROY: 'fetch::majors/DESTROY',
  BROADCAST: 'fetch::majors/BROADCAST',
};

export function loadMajors() {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: '/majors',
      responseSchema: [majorsSchema],
    },
  };
}

export function loadMajor(id) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/majors/${id}`,
      urlParams: { id },
      responseSchema: majorsSchema,
    },
  };
}

export function createMajor(body) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: '/majors',
        body,
        responseSchema: majorsSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(resourceSuccessNotification('major', 'created'));
      dispatch(goToMajor(result));
    });
}

export function updateMajor(id, body) {
  return dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: `/majors/${id}`,
        urlParams: { id },
        body,
        responseSchema: majorsSchema,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('major', 'updated'));
      dispatch(goToMajor(id));
    });
}

export function destroyMajor(id) {
  return dispatch =>
    dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/majors/${id}`,
        urlParams: { id },
      },
    }).then(() => {
      dispatch(removeEntity('majors', id));
      dispatch(resourceSuccessNotification('major', 'destroyed'));
    });
}

export function sendEmail(majorId, body) {
  return dispatch =>
    dispatch({
      type: TYPES.BROADCAST,
      payload: {
        method: 'POST',
        url: `/majors/${majorId}/broadcast`,
        body,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('email', 'sent'));
      dispatch(goToMajor(majorId));
    });
}

export default function majorsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return state.set('activeIds', new Set(action.payload.result));
    case TYPES.DESTROY: {
      const { id } = action.payload.urlParams;
      return state.update('destroyingIds', ids => ids.add(id));
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { id } = action.payload.request.urlParams;
      return state
        .update('activeIds', ids => ids.delete(id))
        .update('destroyingIds', ids => ids.delete(id));
    }
    default:
      return state;
  }
}

const getMajorsData = state => state.majors;

const getMajorId = (state, params) => params.majorId;

const getActiveIds = createSelector(
  getMajorsData,
  majorsData => majorsData.get('activeIds'),
);

export const getMajorEntities = createSelector(
  getActiveIds,
  getEntities,
  (activeIds, entities) => denormalize(activeIds, [majorsSchema], entities),
);

export const getMajorEntity = createSelector(
  getMajorId,
  getEntities,
  (majorId, entities) => entities.getIn(['majors', majorId]),
);

function filterByCategory(majorEntities, categoryType) {
  return majorEntities.filter(({ category }) => category === categoryType);
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

export const getDestroyingIds = createSelector(
  getMajorsData,
  majorsData => majorsData.get('destroyingIds'),
);
