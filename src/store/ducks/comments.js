import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import remove from 'lodash/remove';
import { updateEntity, getEntities } from './entities';
import pagingFnsFactory, { prepareGetPagingFns } from './paginations';
import { getId } from './shared';
import { commentsSchema } from '../../schemas';
import { commentsCollection as collection } from '../../lib/collections';

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

export const getPagingFns = prepareGetPagingFns(({ baseResourceName }) => {
  switch (baseResourceName) {
    case 'majors': return majorsPagingFns;
    case 'articles': return articlesPagingFns;
    case 'discussions': return discussionsPagingFns;
    case 'comments': return commentsPagingFns;
    default: return undefined;
  }
});

export function loadComments(baseResourceName, baseResourceId, page = 1) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: `/${baseResourceName}/${baseResourceId}/comments`,
      query: { page },
      fetchParams: {
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
      fetchParams: {
        baseResourceName, baseResourceId, collection, id,
      },
      responseSchema: commentsSchema,
    },
  };
}

export function createComment(body, baseResourceName, baseResourceId, reverseList) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: `/${baseResourceName}/${baseResourceId}/comments`,
        fetchParams: { collection, baseResourceName, baseResourceId },
        body,
        responseSchema: commentsSchema,
      },
    }).then(({ value: { result } }) => {
      const isChild = baseResourceName === collection;

      if (isChild) {
        const updateFn = parentComment => ({
          ...parentComment,
          childComments: [...parentComment.childComments, result],
        });
        dispatch(updateEntity(collection, baseResourceId, updateFn));

        if (!reverseList) return;
      }

      const pagingFns = getPagingFns({ baseResourceName }, true);
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
      fetchParams: {
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
      const updateFn = (parentComment) => {
        remove(parentComment.childComments, childId => childId === id);
        return { ...parentComment };
      };
      dispatch(updateEntity(collection, baseResourceId, updateFn));
    }

    return dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/${baseResourceName}/${baseResourceId}/comments/${id}`,
        fetchParams: {
          collection, id, baseResourceName, baseResourceId,
        },
      },
    });
  };
}

export default function commentsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`:
      return getPagingFns(payload).removeFromPage(state, payload.request.fetchParams);
    case TYPES.ADD_TO_PAGINATION:
      return getPagingFns(payload).addToPage(state, payload);
    default:
      return state;
  }
}

export const getCommentEntity = createSelector(
  getId,
  getEntities,
  (commentId, entities) => denormalize(commentId, commentsSchema, entities),
);
