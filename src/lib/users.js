import collections from './collections';

/* eslint-disable import/prefer-default-export */
export function getCollectionParams(majorId, extraParams) {
  return {
    collection: collections.users,
    baseResourceName: majorId && collections.majors,
    baseResourceId: majorId,
    ...extraParams,
  };
}
