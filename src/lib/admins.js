import collections from './collections';

/* eslint-disable import/prefer-default-export */
export function getCollectionParams(majorId) {
  return {
    collection: collections.admins,
    baseResourceName: majorId && collections.majors,
    baseResourceId: majorId,
  };
}
