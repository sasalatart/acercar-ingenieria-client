import { Map } from 'immutable';
import { createSelector } from 'reselect';

export const CURRENT_SCHEMA_VERSION = 2;

const INITIAL_STATE = new Map({
  version: CURRENT_SCHEMA_VERSION,
});

export default function schemaReducer(state = INITIAL_STATE) {
  return state;
}

export const getSchemaData = state => state.schema;

export const getSchemaVersion = createSelector(
  getSchemaData,
  schemaData => schemaData.get('version'),
);
