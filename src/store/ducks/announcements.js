import { combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { getIsRequestingFactory } from './loading';
import { withFulfilledTypes } from './shared';
import paginationReducerFactory, { addToPaginationActionFactory, paginationDataSelectorFactory } from './shared/paginations';
import crudReducerFactory, { crudActionsFactory, crudSelectorsFactory } from './shared/crud';
import { announcementsSchema } from '../../schemas';

export const TYPES = withFulfilledTypes({
  LOAD_INDEX: 'announcements/LOAD_INDEX',
  LOAD_PINNED: 'announcements/LOAD_PINNED',
  CREATE: 'announcements/CREATE',
  TOGGLE_PIN: 'announcements/TOGGLE_PIN',
  DESTROY: 'announcements/DESTROY',
  ADD_TO_PAGINATION: 'announcements/ADD_TO_PAGINATION',
});

export default combineReducers({
  pagination: paginationReducerFactory({
    setPage: TYPES.LOAD_INDEX_FULFILLED,
    addToPage: TYPES.ADD_TO_PAGINATION,
    removeFromPages: TYPES.DESTROY_FULFILLED,
  }),
  pinned: crudReducerFactory({
    set: TYPES.LOAD_PINNED_FULFILLED,
    remove: TYPES.DESTROY_FULFILLED,
  }, new OrderedSet([])),
});

const { loadIndex, create, destroy } = crudActionsFactory(TYPES, announcementsSchema);

export const loadAnnouncements = loadIndex;

const addToPagination = addToPaginationActionFactory(TYPES.ADD_TO_PAGINATION);

export function createAnnouncement(body) {
  return (dispatch, getState) => dispatch(create(body))
    .then(({ value: { result } }) => {
      // eslint-disable-next-line no-use-before-define
      dispatch(addToPagination(result, getPaginationData(getState()).paginationInfo));
    });
}

export const destroyAnnouncement = destroy;

export function loadPinnedAnnouncements() {
  return {
    type: TYPES.LOAD_PINNED,
    payload: {
      method: 'GET',
      url: '/announcements/pinned',
      responseSchema: [announcementsSchema],
    },
  };
}

export function togglePinned(id, pinned) {
  return {
    type: TYPES.TOGGLE_PIN,
    payload: {
      method: 'PUT',
      url: `/announcements/${id}`,
      body: { pinned },
      responseSchema: announcementsSchema,
    },
    meta: { id },
  };
}

export const getAnnouncementsState = state => state.announcements;

export const getPaginationData = paginationDataSelectorFactory(
  getAnnouncementsState,
  'pagination',
  announcementsSchema,
);

export const {
  getResourceEntities: getPinnedAnnouncementsEntities,
} = crudSelectorsFactory(getAnnouncementsState, 'pinned', announcementsSchema);

export const getIsLoadingAnnouncements = getIsRequestingFactory(TYPES.LOAD_INDEX);
export const getIsLoadingPinned = getIsRequestingFactory(TYPES.LOAD_PINNED);
export const getIsTogglingPin = getIsRequestingFactory(TYPES.TOGGLE_PIN);
export const getIsDestroyingAnnouncement = getIsRequestingFactory(TYPES.DESTROY);
