import { combineReducers } from 'redux';
import remove from 'lodash/remove';
import upperFirst from 'lodash/upperFirst';
import { getIsRequestingFactory } from './loading';
import { updateEntity, getEntityFactory } from './entities';
import { fulfilledType } from './shared';
import paginationReducerFactory, { addToPaginationActionFactory, paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { commentsSchema } from '../../schemas';
import { getLoadIndexType, getAddToPaginationType } from '../../lib/comments';

const TYPES = {
  LOAD_INDEX_FROM_COMMENT: 'comments/LOAD_INDEX_FROM_COMMENT',
  LOAD_INDEX_FROM_MAJOR: 'comments/LOAD_INDEX_FROM_MAJOR',
  LOAD_INDEX_FROM_ARTICLE: 'comments/LOAD_INDEX_FROM_ARTICLE',
  LOAD_INDEX_FROM_DISCUSSION: 'comments/LOAD_INDEX_FROM_DISCUSSION',
  LOAD: 'comments/LOAD',
  CREATE: 'comments/CREATE',
  UPDATE: 'comments/UPDATE',
  DESTROY: 'comments/DESTROY',
  ADD_TO_FROM_COMMENT: 'comments/ADD_TO_FROM_COMMENT',
  ADD_TO_FROM_MAJOR: 'comments/ADD_TO_FROM_MAJOR',
  ADD_TO_FROM_ARTICLE: 'comments/ADD_TO_FROM_ARTICLE',
  ADD_TO_FROM_DISCUSSION: 'comments/ADD_TO_FROM_DISCUSSION',
  RESET_PAGINATION: 'comments/RESET_PAGINATION',
};

function reducerFactory(setType, addToPageType) {
  return paginationReducerFactory({
    setPage: fulfilledType(setType),
    removeFromPages: fulfilledType(TYPES.DESTROY),
    addToPage: addToPageType,
    resetPagination: TYPES.RESET_PAGINATION,
  });
}

export default combineReducers({
  fromComments: reducerFactory(TYPES.LOAD_INDEX_FROM_COMMENT, TYPES.ADD_TO_FROM_COMMENT),
  fromMajors: reducerFactory(TYPES.LOAD_INDEX_FROM_MAJOR, TYPES.ADD_TO_FROM_MAJOR),
  fromArticles: reducerFactory(TYPES.LOAD_INDEX_FROM_ARTICLE, TYPES.ADD_TO_FROM_ARTICLE),
  fromDiscussions: reducerFactory(TYPES.LOAD_INDEX_FROM_DISCUSSION, TYPES.ADD_TO_FROM_DISCUSSION),
});

export function loadComments({ baseCollection, baseId, query }) {
  const types = { LOAD_INDEX: getLoadIndexType(TYPES, baseCollection) };
  const { loadIndex } = crudActionsFactory(types, commentsSchema, { baseCollection });
  return dispatch => dispatch(loadIndex({ baseId, query }));
}

export const {
  load: loadComment,
  update: updateComment,
} = crudActionsFactory(TYPES, commentsSchema);

const { destroy } = crudActionsFactory(TYPES, commentsSchema);

export function createComment(body, baseId, baseCollection, addToEnd) {
  const { create } = crudActionsFactory(TYPES, commentsSchema, { baseCollection });

  return (dispatch, getState) => dispatch(create(body, baseId))
    .then(({ value: { result } }) => {
      const isChild = baseCollection === commentsSchema.key;
      dispatch(updateEntity(baseCollection, baseId, commentable => ({
        ...commentable,
        enrolledByCurrentUser: true,
        childComments: isChild ? [...commentable.childComments, result] : undefined,
      })));

      if (isChild && !addToEnd) return;

      // eslint-disable-next-line no-use-before-define
      const { paginationInfo } = getPaginationData(getState(), { baseCollection, baseId });
      const type = getAddToPaginationType(TYPES, baseCollection);
      const addToPagination = addToPaginationActionFactory(type);
      dispatch(addToPagination(result, paginationInfo, { baseId, addToEnd }));
    });
}

export function destroyComment(id, baseCollection, baseId) {
  return (dispatch) => {
    if (baseCollection === commentsSchema.key) {
      dispatch(updateEntity(baseCollection, baseId, (parentComment) => {
        remove(parentComment.childComments, childId => childId === id);
        return { ...parentComment };
      }));
    }
    return dispatch(destroy(id));
  };
}

const getCommentsState = state => state.comments;

export const getCommentEntity = getEntityFactory(commentsSchema);

export function getPaginationData(state, props) {
  return paginationDataSelectorFactory(
    getCommentsState,
    `from${upperFirst(props.baseCollection)}`,
    commentsSchema,
  )(state, props);
}

export function getIsLoadingComments(state, params) {
  const type = getLoadIndexType(TYPES, params.baseCollection);
  return getIsRequestingFactory(type)(state, params);
}

export const getIsLoadingComment = getIsRequestingFactory(TYPES.LOAD);
export const getIsDestroyingComment = getIsRequestingFactory(TYPES.DESTROY);
