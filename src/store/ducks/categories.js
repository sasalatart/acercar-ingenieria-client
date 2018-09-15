import { combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { withFulfilledTypes } from './shared';
import crudReducerFactory, { crudActionsFactory, crudSelectorsFactory } from './shared/crud';
import { categoriesSchema } from '../../schemas';

const TYPES = withFulfilledTypes({
  LOAD_INDEX: 'categories/LOAD_INDEX',
});

export default combineReducers({
  activeCategoryIds: crudReducerFactory({ set: TYPES.LOAD_INDEX_FULFILLED }, new OrderedSet([])),
});

export const { loadIndex: loadCategories } = crudActionsFactory(TYPES, categoriesSchema);

export const getCategoriesState = state => state.categories;

export const {
  getResourceEntities: getCategoryEntities,
} = crudSelectorsFactory(getCategoriesState, 'activeCategoryIds', categoriesSchema);

export const getCategoryOptions = createSelector(
  getCategoryEntities,
  categoryEntities =>
    categoryEntities.map(({ id, name }) => ({ key: id, value: name, label: name })),
);
