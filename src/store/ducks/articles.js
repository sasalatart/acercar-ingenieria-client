import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './entities';
import pagingFnsFactory, {
  prepareGetPagingFns,
  removeFromAllPages,
  resetPaginationActionFactory,
} from './paginations';
import { goToArticle } from './routes';
import { getId } from './shared';
import { articlesSchema } from '../../schemas';

export const collection = 'articles';
const commonArgs = [collection, articlesSchema];
const platformPagingFns = pagingFnsFactory(...commonArgs);
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors' });

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
});

const TYPES = {
  LOAD_INDEX: 'articles/LOAD_INDEX',
  LOAD: 'articles/LOAD',
  CREATE: 'articles/CREATE',
  UPDATE: 'articles/UPDATE',
  DESTROY: 'articles/DESTROY',
  RESET_PAGINATION: 'articles/RESET_PAGINATION',
};

export const getPagingFns = prepareGetPagingFns(({ baseResourceId }) => (
  baseResourceId ? majorsPagingFns : platformPagingFns
));

export function getCollectionParams(majorId) {
  return {
    collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}

export function loadArticles(page = 1, majorId, query) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/articles` : '/articles',
      query: { page, ...query },
      urlParams: { page, ...query, ...getCollectionParams(majorId) },
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
      urlParams: { id, ...getCollectionParams(majorId) },
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
        urlParams: getCollectionParams(majorId),
        body,
        responseSchema: articlesSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(goToArticle(result, majorId));
    });
}

export function updateArticle(id, body, majorId) {
  return dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: majorId ? `/majors/${majorId}/articles/${id}` : `/articles/${id}`,
        urlParams: { id, ...getCollectionParams(majorId) },
        body,
        responseSchema: articlesSchema,
      },
    }).then(() => {
      dispatch(goToArticle(id, majorId));
    });
}

export function destroyArticle(id, majorId) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: majorId ? `/majors/${majorId}/articles/${id}` : `/articles/${id}`,
      urlParams: { id, ...getCollectionParams(majorId) },
    },
  };
}

export const resetPagination = resetPaginationActionFactory(TYPES.RESET_PAGINATION);

export default function articlesReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = payload.request;
      return removeFromAllPages(state, [majorsPagingFns, platformPagingFns], urlParams);
    }
    case TYPES.RESET_PAGINATION:
      return getPagingFns(payload).reset(state, payload.baseResourceId);
    default:
      return state;
  }
}

export const getArticleEntity = createSelector(
  getId,
  getEntities,
  (articleId, entities) => denormalize(articleId, articlesSchema, entities),
);

export function getArticleIdFromProps(props) {
  const { match } = props;
  return +(
    match.params.articleId
    || (match.path.includes('articles/:id') && match.params.id)
    || props.articleId
  );
}
