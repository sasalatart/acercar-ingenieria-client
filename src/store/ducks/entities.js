import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createSelector } from 'reselect';

export const INITIAL_STATE = new Map({
  users: new Map({}),
  announcements: new Map({}),
  majors: new Map({}),
  majorsOfInterest: new Map({}),
  majorSummaries: new Map({}),
  questions: new Map({}),
  articles: new Map({}),
  categories: new Map({}),
});

const TYPES = {
  UPDATE: 'entities/UPDATE',
};

export function updateEntities(collectionName, entities) {
  return {
    type: TYPES.UPDATE,
    payload: {
      entities: {
        [collectionName]: entities,
      },
    },
  };
}

export default function entitiesReducer(state = INITIAL_STATE, action) {
  if (action.type.includes('DESTROY_FULFILLED')) {
    const { collection, id } = action.payload.request.urlParams;
    return state.deleteIn([collection, String(id)]);
  }

  if (!action.payload || !action.payload.entities || action.type === REHYDRATE) {
    return state;
  }

  const { entities } = action.payload;
  return Object.keys(entities).reduce(
    (newState, entityName) => {
      const mappedEntities = new Map(entities[entityName]);
      const toSet = newState.get(entityName)
        ? newState.get(entityName).merge(mappedEntities)
        : mappedEntities;

      return newState.setIn([entityName], toSet);
    },
    state,
  );
}

export const getEntities = state => state.entities;

const getCollection = (state, params) => params.collection;
const getId = (state, params) => params.id;

export const getEntity = createSelector(
  getEntities,
  getCollection,
  getId,
  (entities, collection, id) => entities.getIn([collection, String(id)]),
);
