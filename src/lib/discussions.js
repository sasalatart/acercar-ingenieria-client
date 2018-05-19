import keyMirror from 'keymirror';

export const suffixes = keyMirror({ forum: null, mine: null });

export function getSuffix(mine) {
  return mine ? suffixes.mine : suffixes.forum;
}
