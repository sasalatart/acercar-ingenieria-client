import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { creditsSchema } from '../../schemas';
import { getEntities } from './entities';

export const collection = 'credits';

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
      urlParams: { collection, page: 1 },
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
      urlParams: { collection },
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
      urlParams: { id, collection },
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
      urlParams: { id, collection },
    },
  };
}

export default function creditsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return state.set('activeIds', new OrderedSet(action.payload.result));
    case `${TYPES.CREATE}_FULFILLED`: {
      const id = action.payload.result;
      return state.update('activeIds', ids => ids.add(id));
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { id } = action.payload.request.urlParams;
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

const getCreditId = (state, params) => params.creditId;

export const getCreditEntity = createSelector(
  getCreditId,
  getEntities,
  (creditId, entities) => denormalize(creditId, creditsSchema, entities),
);