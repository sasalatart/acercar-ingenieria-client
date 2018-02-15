import { createSelector } from 'reselect';
import { majorsSchema } from '../../schemas';
import { getEntities } from './entities';

export const TYPES = {
  LOAD: 'fetch::majors/LOAD',
};

export function load() {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: '/majors',
      responseSchema: [majorsSchema],
    },
  };
}

export const getMajorsEntities = createSelector(
  getEntities,
  entities => entities.get('majors'),
);
