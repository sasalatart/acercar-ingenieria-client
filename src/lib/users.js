import collections from './collections';

/* eslint-disable import/prefer-default-export */
export function getCollectionParams(majorId, admins) {
  return {
    collection: admins ? collections.admins : collections.users,
    baseResourceName: majorId && collections.majors,
    baseResourceId: majorId,
  };
}
