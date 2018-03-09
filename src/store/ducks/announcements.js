import { Map, List } from 'immutable';
import URI from 'urijs';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { pagingFnsFactory } from './paginations';
import { announcementsSchema } from '../../schemas';
import { getEntities } from './entities';

export const pagingFns = pagingFnsFactory('announcements', announcementsSchema);

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
    platformMeta: new Map({}),
  }),
  pinned: List([]),
});

export const TYPES = {
  LOAD: 'fetch::announcements/LOAD',
  LOAD_PINNED: 'fetch::announcements/LOAD_PINNED',
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

export default function announcementsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return pagingFns.update(state, action.payload);
    case `${TYPES.LOAD_PINNED}_FULFILLED`:
      return state.set('pinned', new List(action.payload.result));
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
    denormalize(pinnedIdsList, [announcementsSchema], entities),
);
