import { adminsCollection as collection } from './collections';

/* eslint-disable import/prefer-default-export */
export function getCollectionParams(majorId) {
  return {
    collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}
