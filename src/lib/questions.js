import keyMirror from 'keymirror';
import upperFirst from 'lodash/upperFirst';

export const suffixes = keyMirror({ answered: null, unanswered: null });

export function getSuffix(unanswered) {
  return unanswered ? suffixes.unanswered : suffixes.answered;
}

export function getLoadIndexType(types, baseId, suffix) {
  const type = baseId ? 'MAJORS' : 'PLATFORM';

  return suffix === suffixes.unanswered
    ? types[`LOAD_${type}_UNANSWERED`]
    : types[`LOAD_${type}_ANSWERED`];
}

export function getAddToPaginationType(types, baseId, suffix) {
  const type = baseId ? 'MAJORS' : 'PLATFORM';

  return suffix === suffixes.unanswered
    ? types[`ADD_TO_${type}_UNANSWERED`]
    : types[`ADD_TO_${type}_ANSWERED`];
}

export function getPaginationKey(baseId, suffix) {
  const keyPrefix = baseId ? 'majors' : 'platform';
  return `${keyPrefix}${upperFirst(suffix)}`;
}
