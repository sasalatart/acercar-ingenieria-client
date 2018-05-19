import keyMirror from 'keymirror';
import { questionsCollection as collection } from './collections';

export const suffixes = keyMirror({ answered: null, pending: null });

export function getCollectionParams(baseResourceId) {
  return {
    collection,
    baseResourceName: baseResourceId && 'majors',
    baseResourceId,
  };
}

export function getSuffix(pending) {
  return pending ? suffixes.pending : suffixes.answered;
}
