import collections from './collections';

export function getLoadIndexType(types, baseCollection) {
  switch (baseCollection) {
    case collections.majors:
      return types.LOAD_INDEX_FROM_MAJOR;
    case collections.articles:
      return types.LOAD_INDEX_FROM_ARTICLE;
    case collections.discussions:
      return types.LOAD_INDEX_FROM_DISCUSSION;
    default:
      return types.LOAD_INDEX_FROM_COMMENT;
  }
}

export function getAddToPaginationType(types, baseCollection) {
  switch (baseCollection) {
    case collections.majors:
      return types.ADD_TO_FROM_MAJOR;
    case collections.articles:
      return types.ADD_TO_FROM_ARTICLE;
    case collections.discussions:
      return types.ADD_TO_FROM_DISCUSSION;
    default:
      return types.ADD_TO_FROM_COMMENT;
  }
}
