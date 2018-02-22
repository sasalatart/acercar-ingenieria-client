import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/lib/constants';

const INITIAL_STATE = new Map({
  users: new Map({}),
  announcements: new Map({}),
  majors: new Map({}),
  majorsOfInterest: new Map({}),
  majorSummaries: new Map({}),
  questions: new Map({}),
});

const TYPES = {
  REMOVE: 'entities/REMOVE',
};

export function removeEntity(collection, key) {
  return {
    type: TYPES.REMOVE,
    payload: {
      collection,
      key,
    },
  };
}

export default function entitiesReducer(state = INITIAL_STATE, action) {
  if (action.type === TYPES.REMOVE) {
    const { payload: { collection, key } } = action;
    return state.deleteIn([collection, String(key)]);
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
