import { createSelector } from 'reselect';
import { announcementsSchema } from '../../schemas';
import { getEntities } from './entities';

export const TYPES = {
  LOAD_PINNED: 'fetch::announcements/LOAD_PINNED',
};

export function loadPinned() {
  return {
    type: TYPES.LOAD_PINNED,
    payload: {
      method: 'GET',
      url: '/announcements/pinned',
      responseSchema: [announcementsSchema],
    },
  };
}

export const getAnnouncementEntities = createSelector(
  getEntities,
  entities => entities.get('announcements'),
);

export const getPinnedAnnouncements = createSelector(
  getAnnouncementEntities,
  announcements => announcements.filter(({ pinned }) => pinned),
);
