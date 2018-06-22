import keyMirror from 'keymirror';
import collections from './collections';

export const suffixes = keyMirror({ answered: null, pending: null });

export function getCollectionParams(baseResourceId, extraParams) {
  return {
    collection: collections.questions,
    baseResourceName: baseResourceId && collections.majors,
    baseResourceId,
    ...extraParams,
  };
}

export function getSuffix(pending) {
  return pending ? suffixes.pending : suffixes.answered;
}
