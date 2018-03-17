import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import {
  removeEntity,
  getEntities,
} from './entities';
import pagingFnsFactory from './paginations';
import { resourceSuccessNotification } from './notifications';
import { goToArticle } from './routes';
import { articlesSchema } from '../../schemas';

const commonArgs = ['articles', articlesSchema];
const platformPagingFns = pagingFnsFactory(...commonArgs);
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors' });

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
  destroyingIds: new Set([]),
});

const TYPES = {
  LOAD_INDEX: 'fetch::articles/LOAD_INDEX',
  LOAD: 'fetch::articles/LOAD',
  CREATE: 'fetch::articles/CREATE',
  UPDATE: 'fetch::articles/UPDATE',
  DESTROY: 'fetch::articles/DESTROY',
  SET_DESTROYING: 'articles/SET_DESTROYING',
};

export function loadArticles(page = 1, majorId) {
  const uri = majorId
    ? URI(`/majors/${majorId}/articles`)
    : URI('/articles');

  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: uri.query({ page }).toString(),
      urlParams: { page, majorId },
      responseSchema: [articlesSchema],
    },
  };
}

export function loadArticle(id, majorId) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/articles/${id}` : `/articles/${id}`,
      urlParams: { majorId, id },
      responseSchema: articlesSchema,
    },
  };
}

export function createArticle(body, majorId) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: majorId ? `/majors/${majorId}/articles` : '/articles',
        body,
        responseSchema: articlesSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(resourceSuccessNotification('article', 'created'));
      dispatch(goToArticle(result, majorId));
    });
}

export function updateArticle(body, articleId, majorId) {
  return dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: majorId ? `/majors/${majorId}/articles/${articleId}` : `/articles/${articleId}`,
        body,
        responseSchema: articlesSchema,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('article', 'updated'));
      dispatch(goToArticle(articleId, majorId));
    });
}

function setDestroyingArticle(id) {
  return {
    type: TYPES.SET_DESTROYING,
    payload: { id },
  };
}

export function destroyArticle(id, majorId) {
  return (dispatch) => {
    dispatch(setDestroyingArticle(id));
    return dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: majorId ? `/majors/${majorId}/articles/${id}` : `/articles/${id}`,
        urlParams: { id, majorId },
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('article', 'destroyed'));
      dispatch(removeEntity('articles', id));
    });
  };
}

export function getPagingFns(isOfMajor) {
  return isOfMajor ? majorsPagingFns : platformPagingFns;
}

export default function articlesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(majorId).reducer.setPage(state, action.payload);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromMajors = majorsPagingFns.reducer.removeFromPage(state, urlParams);
      const fromPlatform = platformPagingFns.reducer.removeFromPage(fromMajors, urlParams);
      return fromPlatform.update('destroyingIds', ids => ids.delete(urlParams.id));
    }
    case TYPES.SET_DESTROYING:
      return state.update('destroyingIds', ids => ids.add(action.payload.id));
    default:
      return state;
  }
}

const getArticlesData = state => state.articles;

const getArticleId = (state, params) => params.articleId;

export const getArticleEntity = createSelector(
  getArticleId,
  getEntities,
  (articleId, entities) => denormalize(articleId, articlesSchema, entities),
);

export const getDestroyingIds = createSelector(
  getArticlesData,
  articlesData => articlesData.get('destroyingIds'),
);
