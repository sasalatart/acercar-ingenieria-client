import { Map, Set } from 'immutable';
import { reset } from 'redux-form';
import URI from 'urijs';
import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import {
  updateEntities,
  removeEntity,
  getEntity,
} from './entities';
import {
  nestedPagingFnsFactory,
  getBaseResourceIdName,
} from './paginations';
import { commentsSchema } from '../../schemas';

const majorsPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'majors');
const articlesPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'articles');
const discussionsPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'discussions');

const collectionName = 'comments';

const INITIAL_STATE = new Map({
  pagination: new Map({
    articles: new Map({}),
    articlesMeta: new Map({}),
  }),
  destroyingIds: new Set(),
});

const TYPES = {
  LOAD: 'fetch::comments/LOAD',
  CREATE: 'fetch::comments/CREATE',
  UPDATE: 'fetch::comments/UPDATE',
  DESTROY: 'fetch::comments/DESTROY',
  SET_DESTROYING: 'comments/SET_DESTROYING',
  ADD_TO_PAGINATION: 'comments/ADD_TO_PAGINATION',
};

function getBaseResourceName(params) {
  if (params.majorId) return 'majors';
  if (params.articleId) return 'articles';
  if (params.discussionId) return 'discussions';

  return undefined;
}

function getBaseResourceId(params) {
  return params.majorId || params.articleId || params.discussionId;
}

export function getPagingFns(resourceName) {
  switch (resourceName) {
    case 'majors': return majorsPagingFns;
    case 'articles': return articlesPagingFns;
    case 'discussions': return discussionsPagingFns;
    default: return undefined;
  }
}

export function loadComments(baseResourceName, baseResourceId, page = 1) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: URI(`/${baseResourceName}/${baseResourceId}/comments`).query({ page }).toString(),
      urlParams: { page, [getBaseResourceIdName(baseResourceName)]: baseResourceId },
      responseSchema: [commentsSchema],
    },
  };
}

function addCommentToParent(parentCommentId, childId) {
  return (dispatch, getState) => {
    const comment = getEntity(getState(), { collectionName, resourceId: parentCommentId });
    comment.childComments.push(childId);
    dispatch(updateEntities(collectionName, { [parentCommentId]: { ...comment } }));
  };
}

function removeCommentFromStore(id) {
  return (dispatch, getState) => {
    const state = getState();
    const comment = getEntity(state, { collectionName, resourceId: id });

    if (comment.parentCommentId) {
      const parent = getEntity(state, { collectionName, resourceId: comment.parentCommentId });
      remove(parent.childComments, childId => childId === id);
      dispatch(updateEntities(collectionName, { [parent.id]: { ...parent } }));
    }

    dispatch(removeEntity('comments', id));
  };
}

export function createComment(body, baseResourceName, baseResourceId) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: `/${baseResourceName}/${baseResourceId}/comments`,
        urlParams: { [getBaseResourceIdName(baseResourceName)]: baseResourceId },
        body,
        responseSchema: commentsSchema,
      },
    }).then(({ value: { result } }) => {
      const { parentCommentId } = body;
      dispatch(reset(parentCommentId ? `commentAnswer${result}` : 'commentNew'));

      if (parentCommentId) {
        dispatch(addCommentToParent(parentCommentId, result));
      } else {
        const pagingFns = getPagingFns(baseResourceName);
        dispatch(pagingFns.addToPaginationAction(TYPES.ADD_TO_PAGINATION, result, 1, baseResourceId));
      }
    });
}

export function updateComment(id, body, baseResourceName, baseResourceId) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/${baseResourceName}/${baseResourceId}/comments/${id}`,
      urlParams: { id, [getBaseResourceIdName(baseResourceName)]: baseResourceId },
      body,
      responseSchema: commentsSchema,
    },
  };
}

function setDestroyingComment(id) {
  return {
    type: TYPES.SET_DESTROYING,
    payload: { id },
  };
}

export function destroyComment(id, baseResourceIdCandidates) {
  return (dispatch) => {
    const baseResourceName = getBaseResourceName(baseResourceIdCandidates);
    const baseResourceId = getBaseResourceId(baseResourceIdCandidates);

    dispatch(setDestroyingComment(id));
    return dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/${baseResourceName}/${baseResourceId}/comments/${id}`,
        urlParams: { id, [getBaseResourceIdName(baseResourceName)]: baseResourceId },
      },
    }).then(() => {
      dispatch(removeCommentFromStore(id));
    });
  };
}

export default function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      return getPagingFns(getBaseResourceName(urlParams)).update(state, action.payload);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      return getPagingFns(getBaseResourceName(urlParams))
        .destroy(state, urlParams)
        .update('destroyingIds', ids => ids.delete(urlParams.id));
    }
    case TYPES.SET_DESTROYING:
      return state.update('destroyingIds', ids => ids.add(action.payload.id));
    case TYPES.ADD_TO_PAGINATION: {
      const {
        baseResourceName, baseResourceId, id, page,
      } = action.payload;
      return getPagingFns(baseResourceName).addToPagination(state, id, page, baseResourceId);
    }
    default:
      return state;
  }
}

const getCommentsData = state => state.comments;

export const getDestroyingIds = createSelector(
  getCommentsData,
  commentsData => commentsData.get('destroyingIds'),
);
