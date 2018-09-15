import { combineReducers } from 'redux';
import { getIsRequestingFactory } from './loading';
import { getEntityFactory } from './entities';
import { withFulfilledTypes } from './shared';
import paginationReducerFactory, { paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { videoLinksSchema } from '../../schemas';
import collections from '../../lib/collections';

const TYPES = withFulfilledTypes({
  LOAD_INDEX: 'videos/LOAD_INDEX',
  CREATE: 'videos/CREATE',
  UPDATE: 'videos/UPDATE',
  DESTROY: 'videos/DESTROY',
  ADD_TO_PAGINATION: 'videos/ADD_TO_PAGINATION',
});

export default combineReducers({
  pagination: paginationReducerFactory({
    setPage: TYPES.LOAD_INDEX_FULFILLED,
    addToPage: TYPES.CREATE_FULFILLED,
    removeFromPages: TYPES.DESTROY_FULFILLED,
  }),
});

export const {
  loadIndex: loadVideoLinks,
  create: createVideoLink,
  update: updateVideoLink,
  destroy: destroyVideoLink,
} = crudActionsFactory(TYPES, videoLinksSchema, { baseCollection: collections.majors });

const getVideoLinksState = state => state.videoLinks;

export const getPaginationData = paginationDataSelectorFactory(
  getVideoLinksState,
  'pagination',
  videoLinksSchema,
);

export const getVideoLinkEntity = getEntityFactory(videoLinksSchema);

export const getIsLoadingVideoLinks = getIsRequestingFactory(TYPES.LOAD_INDEX);
export const getIsDestroyingVideoLink = getIsRequestingFactory(TYPES.DESTROY);
