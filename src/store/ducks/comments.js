import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import remove from 'lodash/remove';
import {
  updateEntities,
  getEntity,
  getEntities,
} from './entities';
import pagingFnsFactory from './paginations';
import { commentsSchema } from '../../schemas';

export const collection = 'comments';
const commonArgs = [collection, commentsSchema];
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors' });
const articlesPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'articles' });
const discussionsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'discussions' });
const commentsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'comments' });

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({}),
    articles: new Map({}),
    discussions: new Map({}),
    comments: new Map({}),
  }),
});

const TYPES = {
  LOAD_INDEX: 'comments/LOAD_INDEX',
  LOAD: 'comments/LOAD',
  CREATE: 'comments/CREATE',
  UPDATE: 'comments/UPDATE',
  DESTROY: 'comments/DESTROY',
  ADD_TO_PAGINATION: 'comments/ADD_TO_PAGINATION',
};

export function getPagingFns(resourceName) {
  switch (resourceName) {
    case 'majors': return majorsPagingFns;
    case 'articles': return articlesPagingFns;
    case 'discussions': return discussionsPagingFns;
    case 'comments': return commentsPagingFns;
    default: return undefined;
  }
}

export function loadComments(baseResourceName, baseResourceId, page = 1) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: `/${baseResourceName}/${baseResourceId}/comments`,
      query: { page },
      urlParams: {
        collection, page, baseResourceName, baseResourceId,
      },
      responseSchema: [commentsSchema],
    },
  };
}

export function loadComment(id, baseResourceName, baseResourceId) {
  const urlPrefix = baseResourceName ? `/${baseResourceName}/${baseResourceId}` : '';

  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `${urlPrefix}/comments/${id}`,
      urlParams: {
        baseResourceName, baseResourceId, collection, id,
      },
      responseSchema: commentsSchema,
    },
  };
}

function addCommentToParent(parentCommentId, childId) {
  return (dispatch, getState) => {
    const comment = getEntity(getState(), { collection, id: parentCommentId });
    comment.childComments.push(childId);
    dispatch(updateEntities(collection, { [parentCommentId]: { ...comment } }));
  };
}

function removeCommentFromParent(id, parentCommentId) {
  return (dispatch, getState) => {
    const state = getState();
    const parent = getEntity(state, { collection, id: parentCommentId });
    remove(parent.childComments, childId => childId === id);
    dispatch(updateEntities(collection, { [parent.id]: { ...parent } }));
  };
}

export function createComment(body, baseResourceName, baseResourceId, reverseList) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: `/${baseResourceName}/${baseResourceId}/comments`,
        urlParams: { collection, baseResourceName, baseResourceId },
        body,
        responseSchema: commentsSchema,
      },
    }).then(({ value: { result } }) => {
      const isChild = baseResourceName === collection;

      if (isChild) {
        dispatch(addCommentToParent(baseResourceId, result));
        if (!reverseList) return;
      }

      const pagingFns = getPagingFns(baseResourceName);
      const type = TYPES.ADD_TO_PAGINATION;
      dispatch(pagingFns.actions.addToPagination(type, result, baseResourceId, reverseList));
    });
}

export function updateComment(id, body, baseResourceName, baseResourceId) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/${baseResourceName}/${baseResourceId}/comments/${id}`,
      urlParams: {
        collection, id, baseResourceName, baseResourceId,
      },
      body,
      responseSchema: commentsSchema,
    },
  };
}

export function destroyComment(id, baseResourceName, baseResourceId) {
  return (dispatch) => {
    if (baseResourceName === collection) {
      dispatch(removeCommentFromParent(id, baseResourceId));
    }

    return dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/${baseResourceName}/${baseResourceId}/comments/${id}`,
        urlParams: {
          collection, id, baseResourceName, baseResourceId,
        },
      },
    });
  };
}

export default function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`: {
      const { baseResourceName } = action.payload.request.urlParams;
      const pagingFns = getPagingFns(baseResourceName);
      return pagingFns.reducer.setPage(state, action.payload);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      return getPagingFns(urlParams.baseResourceName)
        .reducer
        .removeFromPage(state, urlParams);
    }
    case TYPES.ADD_TO_PAGINATION: {
      const {
        baseResourceName, baseResourceId, id, page, addToEnd,
      } = action.payload;
      return getPagingFns(baseResourceName)
        .reducer
        .addToPage(state, id, page, baseResourceId, addToEnd);
    }
    default:
      return state;
  }
}

const getId = (state, params) => params.id;

export const getCommentEntity = createSelector(
  getId,
  getEntities,
  (commentId, entities) => denormalize(commentId, commentsSchema, entities),
);
