import keyMirror from 'keymirror';

import { articlesCollection as collection } from './collections';

export const suffixes = keyMirror({ approved: null, mine: null, pending: null });

export function getSuffix(mine, pending) {
  if (!mine && !pending) return suffixes.approved;
  return pending ? suffixes.pending : suffixes.mine;
}

export function getCollectionParams(majorId) {
  return {
    collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}
