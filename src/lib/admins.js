// eslint-disable-next-line import/prefer-default-export
export function getToggleType(types, promoting, baseId) {
  if (baseId) {
    return promoting ? types.PROMOTE_TO_MAJOR : types.DEMOTE_FROM_MAJOR;
  }

  return promoting ? types.PROMOTE_TO_PLATFORM : types.DEMOTE_FROM_PLATFORM;
}
