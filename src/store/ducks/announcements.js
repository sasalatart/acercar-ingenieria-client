import { Map, Set } from 'immutable';
import URI from 'urijs';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import pagingFnsFactory from './paginations';
import { announcementsSchema } from '../../schemas';
import {
  getEntities,
  removeEntity,
} from './entities';
import { resourceSuccessNotification } from './notifications';

export const pagingFns = pagingFnsFactory('announcements', announcementsSchema);

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
  }),
  pinned: new Set([]),
  updatingIds: new Set([]),
  destroyingIds: new Set([]),
});

export const TYPES = {
  LOAD: 'fetch::announcements/LOAD',
  LOAD_PINNED: 'fetch::announcements/LOAD_PINNED',
  CREATE: 'fetch::announcements/CREATE',
  UPDATE: 'fetch::announcements/UPDATE',
  DESTROY: 'fetch::announcements/DESTROY',
  ADD_TO_PAGINATION: 'announcements/ADD_TO_PAGINATION',
};

export function loadAnnouncements(page) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: URI('/announcements').query({ page }).toString(),
      urlParams: { page },
      responseSchema: [announcementsSchema],
    },
  };
}

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

export function createAnnouncement(body) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: '/announcements',
        body,
        responseSchema: announcementsSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(pagingFns.actions.addToPage(TYPES.ADD_TO_PAGINATION, result, 1));
      dispatch(resourceSuccessNotification('announcement', 'created'));
    });
}

export function updatePinned(id, pinned) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/announcements/${id}`,
      urlParams: { id },
      body: { pinned },
      responseSchema: announcementsSchema,
    },
  };
}

export function destroyAnnouncement(id) {
  return dispatch =>
    dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/announcements/${id}`,
        urlParams: { id },
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('announcement', 'destroyed'));
      dispatch(removeEntity('announcements', id));
    });
}

export default function announcementsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return pagingFns.reducer.setPage(state, action.payload);
    case `${TYPES.LOAD_PINNED}_FULFILLED`:
      return state.set('pinned', new Set(action.payload.result));
    case TYPES.ADD_TO_PAGINATION: {
      const { id, page } = action.payload;
      return pagingFns.reducer.addToPage(state, id, page);
    }
    case `${TYPES.UPDATE}_PENDING`:
      return state.update('updatingIds', ids => ids.add(action.payload.urlParams.id));
    case `${TYPES.UPDATE}_FULFILLED`:
      return state.update('updatingIds', ids => ids.delete(action.payload.request.urlParams.id));
    case TYPES.DESTROY:
      return state.update('destroyingIds', ids => ids.add(action.payload.urlParams.id));
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      return pagingFns
        .reducer
        .removeFromPage(state, urlParams)
        .update('destroyingIds', ids => ids.delete(urlParams.id))
        .update('pinned', ids => ids.delete(urlParams.id));
    }
    default:
      return state;
  }
}

export const getAnnouncementsData = state => state.announcements;

const getPinnedIds = createSelector(
  getAnnouncementsData,
  announcementsData => announcementsData.get('pinned'),
);

export const getPinnedAnnouncementsEntities = createSelector(
  getPinnedIds,
  getEntities,
  (pinnedIdsList, entities) =>
    denormalize(pinnedIdsList, [announcementsSchema], entities).toJS(),
);

export const getUpdatingIds = createSelector(
  getAnnouncementsData,
  announcementsData => announcementsData.get('updatingIds'),
);

export const getDestroyingIds = createSelector(
  getAnnouncementsData,
  announcementsData => announcementsData.get('destroyingIds'),
);
