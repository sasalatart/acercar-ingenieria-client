import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import { categoriesSchema } from '../../schemas';
import { categoriesCollection as collection } from '../../lib/collections';

const INITIAL_STATE = Map({
  activeCategoryIds: [],
});

const TYPES = {
  LOAD_INDEX: 'categories/LOAD_INDEX',
};

export function loadCategories() {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: '/categories',
      fetchParams: { collection },
      responseSchema: [categoriesSchema],
    },
  };
}

export default function categoriesReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return state.set('activeCategoryIds', payload.result);
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
  (activeCategoryIds, entities) =>
    denormalize(activeCategoryIds, [categoriesSchema], entities),
);

export const getCategoryOptions = createSelector(
  getCategoryEntities,
  categoryEntities =>
    categoryEntities.map(({ id, name }) => ({ key: id, value: name, label: name })),
);
