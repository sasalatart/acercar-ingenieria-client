import keyMirror from 'keymirror';
import upperFirst from 'lodash/upperFirst';
import collections from './collections';

export const suffixes = keyMirror({ approved: null, mine: null, unapproved: null });

export function getLoadIndexType(types, baseId, suffix) {
  const type = baseId ? 'MAJORS' : 'PLATFORM';

  switch (suffix) {
    case suffixes.mine:
      return types[`LOAD_${type}_MINE`];
    case suffixes.unapproved:
      return types[`LOAD_${type}_UNAPPROVED`];
    default:
      return types[`LOAD_${type}_APPROVED`];
  }
}

export function getPaginationKey(baseId, suffix) {
  const keyPrefix = baseId ? 'majors' : 'platform';
  return `${keyPrefix}${upperFirst(suffix)}`;
}

export function getSuffix(mine, unapproved) {
  if (!mine && !unapproved) return suffixes.approved;
  return unapproved ? suffixes.unapproved : suffixes.mine;
}

export function getCollectionParams(majorId, extraParams) {
  return {
    collection: collections.articles,
    baseCollection: majorId && collections.majors,
    baseId: majorId,
    ...extraParams,
  };
}
