import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import pagingFnsFactory from './paginations';
import { announcementsSchema } from '../../schemas';
import { getEntities } from './entities';
import collections from '../../lib/collections';
import { suffixes } from '../../lib/announcements';

const collection = collections.announcements;
export const pagingFns = pagingFnsFactory(collection, announcementsSchema);

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
  }),
  pinned: new Set([]),
});

export const TYPES = {
  LOAD_INDEX: 'announcements/LOAD_INDEX',
  LOAD_PINNED: 'announcements/LOAD_PINNED',
  CREATE: 'announcements/CREATE',
  UPDATE: 'announcements/UPDATE',
  DESTROY: 'announcements/DESTROY',
  ADD_TO_PAGINATION: 'announcements/ADD_TO_PAGINATION',
};

export function loadAnnouncements(page = 1) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: '/announcements',
      query: { page },
      fetchParams: { collection, page },
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
      fetchParams: { collection, suffix: suffixes.pinned },
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
        fetchParams: { collection },
        body,
        responseSchema: announcementsSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(pagingFns.actions.addToPagination(TYPES.ADD_TO_PAGINATION, result));
    });
}

export function updatePinned(id, pinned) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/announcements/${id}`,
      fetchParams: { collection, id },
      body: { pinned },
      responseSchema: announcementsSchema,
    },
  };
}

export function destroyAnnouncement(id) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: `/announcements/${id}`,
      fetchParams: { collection, id },
    },
  };
}

export default function announcementsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return pagingFns.reducer.setPage(state, payload);
    case `${TYPES.LOAD_PINNED}_FULFILLED`:
      return state.set('pinned', new Set(payload.result));
    case TYPES.ADD_TO_PAGINATION:
      return pagingFns.reducer.addToPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { fetchParams } = payload.request;
      return pagingFns
        .reducer
        .removeFromPage(state, fetchParams)
        .update('pinned', ids => ids.delete(fetchParams.id));
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
