import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/lib/constants';
import mapValues from 'lodash/mapValues';

const INITIAL_STATE = new Map({
  users: new Map({}),
  announcements: new Map({}),
});

export default function entitiesReducer(state = INITIAL_STATE, action) {
  if (!action.payload || !action.payload.entities || action.type === REHYDRATE) {
    return state;
  }

  const { entities } = action.payload;
  return state.merge(mapValues(
    entities,
    (collection, collectionName) => state.get(collectionName).merge(new Map(collection)),
  ));
}

export const getEntities = state => state.entities;
