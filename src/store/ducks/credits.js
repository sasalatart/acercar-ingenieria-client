import { combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { getIsRequestingFactory } from './loading';
import { getEntityFactory } from './entities';
import { withFulfilledTypes } from './shared';
import crudReducerFactory, { crudActionsFactory, crudSelectorsFactory } from './shared/crud';
import { creditsSchema } from '../../schemas';

const TYPES = withFulfilledTypes({
  LOAD_INDEX: 'credits/LOAD_INDEX',
  CREATE: 'credits/CREATE',
  UPDATE: 'credits/UPDATE',
  DESTROY: 'credits/DESTROY',
});

export default combineReducers({
  activeCreditsIds: crudReducerFactory({
    set: TYPES.LOAD_INDEX_FULFILLED,
    add: TYPES.CREATE_FULFILLED,
    remove: TYPES.DESTROY_FULFILLED,
  }, new OrderedSet([])),
});

export const {
  loadIndex: loadCredits,
  create: createCredit,
  update: updateCredit,
  destroy: destroyCredit,
} = crudActionsFactory(TYPES, creditsSchema);

export const getCreditsState = state => state.credits;

export const {
  getResourceEntities: getCreditsEntities,
} = crudSelectorsFactory(getCreditsState, 'activeCreditsIds', creditsSchema);

export const getCreditEntity = getEntityFactory(creditsSchema);

export const getIsLoadingCredits = getIsRequestingFactory(TYPES.LOAD_INDEX);
export const getIsDestroyingCredit = getIsRequestingFactory(TYPES.DESTROY);
