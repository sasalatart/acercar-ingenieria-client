import keyMirror from 'keymirror';

export const suffixes = keyMirror({ seen: null, pending: null });

export function getSuffix(seen) {
  return seen ? suffixes.seen : suffixes.pending;
}

export const NOTIFYABLE_TYPES = {
  discussion: 'Discussion',
  article: 'Article',
  comment: 'Comment',
};
