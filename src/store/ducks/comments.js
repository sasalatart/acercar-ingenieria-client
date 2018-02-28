import { Map, Set } from 'immutable';
import URI from 'urijs';
import { createSelector } from 'reselect';
import { removeEntity } from './entities';
import {
  nestedPagingFnsFactory,
  getBaseResourceIdName,
} from './paginations';
import { commentsSchema } from '../../schemas';

const majorsPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'majors');
const articlesPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'articles');
const discussionsPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'discussions');

const INITIAL_STATE = new Map({
  pagination: new Map({
    articles: new Map({}),
    articlesMeta: new Map({}),
  }),
  destroyingIds: new Set(),
});

const TYPES = {
  LOAD: 'fetch::comments/LOAD',
  DESTROY: 'fetch::comments/DESTROY',
  SET_DESTROYING: 'comments/SET_DESTROYING',
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

export function getPagingFns(params) {
  const resourceName = getBaseResourceName(params);

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
      dispatch(removeEntity('comments', id));
    });
  };
}

export default function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return getPagingFns(action.payload.request.urlParams).update(state, action.payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      return getPagingFns(urlParams)
        .destroy(state, urlParams)
        .update('destroyingIds', ids => ids.delete(urlParams.id));
    }
    case TYPES.SET_DESTROYING:
      return state.update('destroyingIds', ids => ids.add(action.payload.id));
    default:
      return state;
  }
}

const getCommentsData = state => state.comments;

export const getDestroyingIds = createSelector(
  getCommentsData,
  commentsData => commentsData.get('destroyingIds'),
);
