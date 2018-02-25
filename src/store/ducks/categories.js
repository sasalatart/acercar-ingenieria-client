import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import { categoriesSchema } from '../../schemas';

const INITIAL_STATE = Map({
  activeCategoryIds: Set(),
});

const TYPES = {
  LOAD: 'fetch::categories/LOAD',
};

export function loadCategories() {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: '/categories',
      responseSchema: [categoriesSchema],
    },
  };
}

export default function categoriesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return state.set('activeCategoryIds', action.payload.result);
    default:
      return state;
  }
}

export const getCategoriesData = state => state.categories;

const getActiveCategoryIds = createSelector(
  getCategoriesData,
  categoriesData => categoriesData.get('activeCategoryIds'),
);

export const getCategoryEntities = createSelector(
  getActiveCategoryIds,
  getEntities,
  (activeCategoryIds, entities) => denormalize(activeCategoryIds, [categoriesSchema], entities),
);

export const getCategoryOptions = createSelector(
  getCategoryEntities,
  categoryEntities =>
    categoryEntities.map(({ id, name }) => ({ key: id, value: name, label: name })),
);
