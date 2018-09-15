import keyMirror from 'keymirror';

export const suffixes = keyMirror({ seen: null, unseen: null });

export function getSuffix(seen) {
  return seen ? suffixes.seen : suffixes.unseen;
}

export const NOTIFYABLE_TYPES = {
  discussion: 'Discussion',
  article: 'Article',
  comment: 'Comment',
};

export function getLoadIndexType(types, suffix) {
  return suffix === suffixes.seen ? types.LOAD_SEEN : types.LOAD_UNSEEN;
}
