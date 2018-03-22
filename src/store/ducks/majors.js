import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { majorsSchema } from '../../schemas';
import { goToMajor } from './routes';
import { getEntities } from './entities';
import { resourceSuccessNotification } from './notifications';

export const collection = 'majors';

const INITIAL_STATE = new Map({
  activeIds: new Set(),
});

export const TYPES = {
  LOAD_INDEX: 'majors/LOAD_INDEX',
  LOAD: 'majors/LOAD',
  CREATE: 'majors/CREATE',
  UPDATE: 'majors/UPDATE',
  DESTROY: 'majors/DESTROY',
  BROADCAST: 'majors/BROADCAST',
};

export function loadMajors() {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: '/majors',
      urlParams: { collection, page: 1 },
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
      urlParams: { collection, id },
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
        urlParams: { collection },
        body,
        responseSchema: majorsSchema,
      },
    }).then(({ value: { result } }) => {
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
        urlParams: { collection, id },
        body,
        responseSchema: majorsSchema,
      },
    }).then(() => {
      dispatch(goToMajor(id));
    });
}

export function destroyMajor(id) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: `/majors/${id}`,
      urlParams: { collection, id },
    },
  };
}

export function sendEmail(id, body) {
  return dispatch =>
    dispatch({
      type: TYPES.BROADCAST,
      payload: {
        method: 'POST',
        url: `/majors/${id}/broadcast`,
        urlParams: { collection, id },
        body,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('email', 'sent'));
      dispatch(goToMajor(id));
    });
}

export default function majorsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return state.set('activeIds', new Set(action.payload.result));
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { id } = action.payload.request.urlParams;
      return state.update('activeIds', ids => ids.delete(id));
    }
    default:
      return state;
  }
}

const getMajorsData = state => state.majors;

const getId = (state, params) => params.id;

const getActiveIds = createSelector(
  getMajorsData,
  majorsData => majorsData.get('activeIds'),
);

export const getMajorEntities = createSelector(
  getActiveIds,
  getEntities,
  (activeIds, entities) => denormalize(activeIds, [majorsSchema], entities).toJS(),
);

export const getMajorEntity = createSelector(
  getId,
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
    ...majorEntities.map(({ id, name }) => ({ key: id, value: id, label: name })),
  ]),
);

export function getMajorIdFromProps(props) {
  const { match } = props;
  return +(
    match.params.majorId
    || (match.path.includes('majors/:id') && match.params.id)
    || props.majorId
  );
}
