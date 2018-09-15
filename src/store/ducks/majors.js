import { combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { goToMajor } from './routes';
import { getIsRequestingFactory } from './loading';
import { resourceSuccessNotification } from './notifications';
import { getEntityFactory } from './entities';
import { withFulfilledTypes } from './shared';
import crudReducerFactory, { crudActionsFactory, crudSelectorsFactory } from './shared/crud';
import { majorsSchema } from '../../schemas';

export const TYPES = withFulfilledTypes({
  LOAD_INDEX: 'majors/LOAD_INDEX',
  LOAD: 'majors/LOAD',
  CREATE: 'majors/CREATE',
  UPDATE: 'majors/UPDATE',
  DESTROY: 'majors/DESTROY',
  EMAIL: 'majors/EMAIL',
});

export default combineReducers({
  activeMajorsIds: crudReducerFactory({ set: TYPES.LOAD_INDEX_FULFILLED }, new OrderedSet([])),
});

const {
  loadIndex, load, create, update, destroy,
} = crudActionsFactory(TYPES, majorsSchema);

export const loadMajors = loadIndex;
export const loadMajor = load;
export const destroyMajor = destroy;

export function createMajor(body) {
  return dispatch => dispatch(create(body))
    .then(({ value: { result } }) => dispatch(goToMajor(result)));
}

export function updateMajor(id, body) {
  return dispatch => dispatch(update(id, body))
    .then(() => dispatch(goToMajor(id)));
}

export function sendEmail(id, body, personal) {
  return dispatch =>
    dispatch({
      type: TYPES.EMAIL,
      payload: {
        method: 'POST',
        url: `/majors/${id}/${personal ? 'personal-email' : 'email'}`,
        body,
      },
      meta: { id },
    }).then(() => {
      dispatch(resourceSuccessNotification('email', 'sent'));
      dispatch(goToMajor(id));
    });
}

const getMajorsState = state => state.majors;

export const {
  getResourceEntities: getMajorEntities,
} = crudSelectorsFactory(getMajorsState, 'activeMajorsIds', majorsSchema);

export const getMajorEntity = getEntityFactory(majorsSchema);

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
  majorEntities => majorEntities
    .map(({ id, name }) => ({ key: id, value: id, label: name })),
);

export function getMajorIdFromProps(props) {
  const { match } = props;
  return +(
    match.params.majorId
    || (match.path.includes('majors/:id') && match.params.id)
    || props.majorId
  );
}

export const getIsLoadingMajors = getIsRequestingFactory(TYPES.LOAD_INDEX);
export const getIsLoadingMajor = getIsRequestingFactory(TYPES.LOAD);
export const getIsDestroyingMajor = getIsRequestingFactory(TYPES.DESTROY);
