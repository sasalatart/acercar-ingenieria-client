import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { announcementsSchema } from '../../schemas';
import { getEntities } from './entities';

const INITIAL_STATE = new Map({
  pinned: [],
});

export const TYPES = {
  LOAD_PINNED: 'fetch::announcements/LOAD_PINNED',
};

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
    case `${TYPES.LOAD_PINNED}_FULFILLED`:
      return state.set('pinned', action.payload.result);
    default:
      return state;
  }
}

export const getAnnouncementsData = state => state.announcements;

export const getAnnouncementEntities = createSelector(
  getEntities,
  entities => entities.get('announcements'),
);

export const getPinnedAnnouncements = createSelector(
  getAnnouncementsData,
  getAnnouncementEntities,
  (announcementsData, announcementEntities) =>
    announcementsData.get('pinned').map(id => announcementEntities.get(String(id))),
);
