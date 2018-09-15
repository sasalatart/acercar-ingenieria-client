import keyMirror from 'keymirror';

export const suffixes = keyMirror({ index: null, mine: null });

export function getSuffix(mine) {
  return mine ? suffixes.mine : suffixes.index;
}

export function getLoadIndexType(types, suffix) {
  return suffix === suffixes.mine ? types.LOAD_PLATFORM_MINE : types.LOAD_PLATFORM_INDEX;
}
