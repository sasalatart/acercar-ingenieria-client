import { createSelector } from 'reselect';
import { normalize } from 'normalizr';
import api from '../../services/api';
import { announcementsSchema } from '../../schemas';
import { getEntities } from './entities';

export const TYPES = {
  LOAD_PINNED: 'announcements/LOAD_PINNED',
};

export function loadPinned() {
  return {
    type: TYPES.LOAD_PINNED,
    payload: api
      .announcements.pinned()
      .then(({ data }) => normalize(data, [announcementsSchema])),
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
