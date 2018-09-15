import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getId } from './shared';

export const INITIAL_STATE = new Map({
  majors: new Map({}),
  majorSummaries: new Map({}),
  majorsOfInterest: new Map({}),
  users: new Map({}),
  userSummaries: new Map({}),
  announcements: new Map({}),
  questions: new Map({}),
  articles: new Map({}),
  articleSummaries: new Map({}),
  discussions: new Map({}),
  discussionSummaries: new Map({}),
  categories: new Map({}),
  comments: new Map({}),
  videoLinks: new Map({}),
  notifications: new Map({}),
  credits: new Map({}),
});

const TYPES = {
  UPDATE: 'entities/UPDATE',
};

export function updateEntity(collection, id, updateFn) {
  return (dispatch, getState) => {
    // eslint-disable-next-line no-use-before-define
    const entity = getEntity(getState(), { collection, id });
    return dispatch({
      type: TYPES.UPDATE,
      payload: {
        entities: {
          [collection]: {
            [id]: { ...updateFn(entity) },
          },
        },
      },
    });
  };
}

export default function entitiesReducer(state = INITIAL_STATE, { type, payload, meta }) {
  if (meta && meta.destroy && type.includes('FULFILLED')) {
    const { collection, id } = meta;
    return state.deleteIn([collection, String(id)]);
  }

  if (!payload || !payload.entities || type === REHYDRATE) {
    return state;
  }

  const { entities } = payload;
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

export function getEntityFactory(schema) {
  return createSelector(
    getId,
    getEntities,
    (id, entities) => denormalize(id, schema, entities),
  );
}

export const getEntity = createSelector(
  getEntities,
  getCollection,
  getId,
  (entities, collection, id) => entities.getIn([collection, String(id)]),
);
