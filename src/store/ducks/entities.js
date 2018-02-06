import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/lib/constants';

const INITIAL_STATE = new Map({
  announcements: new Map({}),
});

export default function entitiesReducer(state = INITIAL_STATE, action) {
  if (!action.payload || !action.payload.entities || action.type === REHYDRATE) {
    return state;
  }

  const { entities } = action.payload;
  return Object.keys(entities).reduce(
    (newState, entityName) => newState.mergeIn([entityName], entities[entityName]),
    state,
  );
}

export const getEntities = state => state.entities;
