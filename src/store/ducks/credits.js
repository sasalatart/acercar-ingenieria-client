import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { creditsSchema } from '../../schemas';
import { getEntities } from './entities';
import { getCreditId } from './shared';
import { creditsCollection as collection } from '../../lib/collections';

const INITIAL_STATE = new Map({
  activeIds: new OrderedSet(),
});

const TYPES = {
  LOAD_INDEX: 'credits/LOAD_INDEX',
  CREATE: 'credits/CREATE',
  UPDATE: 'credits/UPDATE',
  DESTROY: 'credits/DESTROY',
};

export function loadCredits() {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: '/credits',
      fetchParams: { collection, page: 1 },
      responseSchema: [creditsSchema],
    },
  };
}

export function createCredit(values) {
  return {
    type: TYPES.CREATE,
    payload: {
      method: 'POST',
      url: '/credits',
      fetchParams: { collection },
      body: values,
      responseSchema: creditsSchema,
    },
  };
}

export function updateCredit(id, values) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/credits/${id}`,
      fetchParams: { id, collection },
      body: values,
      responseSchema: creditsSchema,
    },
  };
}

export function destroyCredit(id) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: `/credits/${id}`,
      fetchParams: { id, collection },
    },
  };
}

export default function creditsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return state.set('activeIds', new OrderedSet(payload.result));
    case `${TYPES.CREATE}_FULFILLED`:
      return state.update('activeIds', ids => ids.add(payload.result));
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { id } = payload.request.fetchParams;
      return state.update('activeIds', ids => ids.delete(id));
    }
    default:
      return state;
  }
}

const getCreditsData = state => state.credits;

const getActiveIds = createSelector(
  getCreditsData,
  creditsData => creditsData.get('activeIds'),
);

export const getCreditsEntities = createSelector(
  getActiveIds,
  getEntities,
  (activeIds, entities) => denormalize(activeIds, [creditsSchema], entities).toJS(),
);

export const getCreditEntity = createSelector(
  getCreditId,
  getEntities,
  (creditId, entities) => denormalize(creditId, creditsSchema, entities),
);
