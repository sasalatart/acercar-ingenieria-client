import keyMirror from 'keymirror';

import { articlesCollection as collection } from './collections';

export const suffixes = keyMirror({ approved: null, pending: null });

export function getSuffix(pending) {
  return pending ? suffixes.pending : suffixes.approved;
}

export function getCollectionParams(majorId) {
  return {
    collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}
