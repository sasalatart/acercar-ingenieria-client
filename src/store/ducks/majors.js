import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { majorsSchema } from '../../schemas';
import { getEntities } from './entities';
import { majorEditedNotification } from './notifications';
import ROUTES, {
  MAJOR_TAB_NAMES as TAB_NAMES,
  addQueryToUri,
} from '../../routes';

const INITIAL_STATE = Map({
  currentTab: undefined,
});

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

export function setMajorTab(majorId, tab) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_TAB,
      payload: { tab },
    });
    dispatch(addQueryToUri(ROUTES.MAJOR(majorId), { tab }));
  };
}

export function addQueryToMajorPath(majorId, query) {
  return (dispatch, getState) => {
    // eslint-disable-next-line no-use-before-define
    const currentTab = getMajorTab(getState());
    dispatch(addQueryToUri(ROUTES.MAJOR(majorId), { ...query, tab: currentTab }));
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
      dispatch(setMajorTab(majorId, TAB_NAMES.info));
    });
}

export default function majorsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_TAB:
      return state.set('currentTab', action.payload.tab);
    default:
      return state;
  }
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

export const getMajorTab = createSelector(
  getMajorsData,
  majorsData => majorsData.get('currentTab'),
);
