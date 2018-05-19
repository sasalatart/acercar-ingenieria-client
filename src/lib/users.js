import { usersCollection as collection } from './collections';

/* eslint-disable import/prefer-default-export */
export function getCollectionParams(majorId, admins) {
  return {
    collection: admins ? 'admins' : collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}
