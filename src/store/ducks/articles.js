import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { removeEntity, getEntities } from './entities';
import {
  pagingFnsFactory,
  nestedPagingFnsFactory,
} from './paginations';
import { resourceSuccessNotification } from './notifications';
import {
  goToArticles,
  goToArticle,
} from './routes';
import { articlesSchema } from '../../schemas';

const platformPagingFns = pagingFnsFactory('articles', articlesSchema);
const majorsPagingFns = nestedPagingFnsFactory('articles', articlesSchema, 'majors');

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
    platformMeta: new Map({}),
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
  destroyingIds: new Set(),
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
    }).then(() => {
      dispatch(resourceSuccessNotification('article', 'created'));
      dispatch(goToArticles(majorId));
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

export function destroyArticle(id, majorId, page) {
  return (dispatch) => {
    dispatch(setDestroyingArticle(id));
    return dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: majorId ? `/majors/${majorId}/articles/${id}` : `/articles/${id}`,
        urlParams: { id, majorId, page },
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

function getPagingFnsFromAction(payload) {
  const { majorId } = payload.request.urlParams;
  return getPagingFns(majorId);
}

export default function articlesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(action.payload.request.urlParams.majorId).update(state, action.payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      return getPagingFnsFromAction(action.payload)
        .destroy(state, urlParams)
        .update('destroyingIds', ids => ids.delete(urlParams.id));
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
