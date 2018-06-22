import keyMirror from 'keymirror';
import collections from './collections';

export const suffixes = keyMirror({ approved: null, mine: null, pending: null });

export function getSuffix(mine, pending) {
  if (!mine && !pending) return suffixes.approved;
  return pending ? suffixes.pending : suffixes.mine;
}

export function getCollectionParams(majorId, extraParams) {
  return {
    collection: collections.articles,
    baseResourceName: majorId && collections.majors,
    baseResourceId: majorId,
    ...extraParams,
  };
}
