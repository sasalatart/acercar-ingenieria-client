import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/lib/constants';

const INITIAL_STATE = new Map({
  users: new Map({}),
  announcements: new Map({}),
  majorSummaries: new Map({}),
});

export default function entitiesReducer(state = INITIAL_STATE, action) {
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
