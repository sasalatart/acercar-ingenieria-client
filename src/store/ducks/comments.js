import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import remove from 'lodash/remove';
import { updateEntity, getEntities } from './entities';
import pagingFnsFactory, { prepareGetPagingFns } from './paginations';
import { getId } from './shared';
import { commentsSchema } from '../../schemas';
import collections from '../../lib/collections';

const collection = collections.comments;

function createPagingFns(baseResourceName) {
  return pagingFnsFactory(collection, commentsSchema, { baseResourceName });
}

const pagingFns = {
  comments: createPagingFns(collection),
  majors: createPagingFns(collections.majors),
  articles: createPagingFns(collections.articles),
  discussions: createPagingFns(collections.discussions),
};

const INITIAL_STATE = new Map({
  pagination: new Map({
    comments: new Map({}),
    majors: new Map({}),
    articles: new Map({}),
    discussions: new Map({}),
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

export const getPagingFns = prepareGetPagingFns(({ baseResourceName }) =>
  pagingFns[baseResourceName]);

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

      const updateFn = commentable => ({
        ...commentable,
        enrolledByCurrentUser: true,
        childComments: isChild
          ? [...commentable.childComments, result]
          : undefined,
      });
      dispatch(updateEntity(baseResourceName, baseResourceId, updateFn));

      if (isChild && !reverseList) return;

      const actionCreator = getPagingFns({ baseResourceName }, true).actions.addToPagination;
      dispatch(actionCreator(TYPES.ADD_TO_PAGINATION, result, baseResourceId, reverseList));
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
