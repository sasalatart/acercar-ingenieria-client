import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import find from 'lodash/find';
import { getEntities } from './entities';
import pagingFnsFactory, {
  prepareGetPagingFns,
  removeFromAllPages,
  resetPaginationActionFactory,
} from './paginations';
import { getMajorOptionsForCurrentUser } from './sessions';
import { goToArticle } from './routes';
import { getId } from './shared';
import { articlesSchema } from '../../schemas';
import { suffixes, getCollectionParams } from '../../lib/articles';
import { articlesCollection } from '../../lib/collections';

const commonArgs = [articlesCollection, articlesSchema];
const platformApprovedPagingFns = pagingFnsFactory(...commonArgs, { suffix: suffixes.approved });
const platformPendingPagingFns = pagingFnsFactory(...commonArgs, { suffix: suffixes.pending });
const majorsApprovedPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors', suffix: suffixes.approved });
const majorsPendingPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors', suffix: suffixes.pending });

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({
      approved: new Map({}),
      pending: new Map({}),
    }),
    majors: new Map({
      approved: new Map({}),
      pending: new Map({}),
    }),
  }),
});

const TYPES = {
  LOAD_INDEX: 'articles/LOAD_INDEX',
  LOAD: 'articles/LOAD',
  CREATE: 'articles/CREATE',
  UPDATE: 'articles/UPDATE',
  APPROVAL: 'articles/UPDATE_APPROVAL',
  DESTROY: 'articles/DESTROY',
  RESET_PAGINATION: 'articles/RESET_PAGINATION',
};

export const getPagingFns = prepareGetPagingFns(({ baseResourceId, suffix }) => {
  if (baseResourceId) {
    return suffix === suffixes.pending ? majorsPendingPagingFns : majorsApprovedPagingFns;
  }

  return suffix === suffixes.pending ? platformPendingPagingFns : platformApprovedPagingFns;
});

export function loadArticles(page = 1, majorId, suffix, search) {
  const urlSuffix = suffix !== suffixes.approved ? `/${suffix}` : '';
  const query = { page, ...search };

  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: majorId ? `/majors/${majorId}/articles${urlSuffix}` : `/articles/${urlSuffix}`,
      query,
      fetchParams: { ...query, ...getCollectionParams(majorId), suffix },
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
      fetchParams: { id, ...getCollectionParams(majorId) },
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
        fetchParams: getCollectionParams(majorId),
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
        fetchParams: { id, ...getCollectionParams(majorId) },
        body,
        responseSchema: articlesSchema,
      },
    }).then(() => {
      dispatch(goToArticle(id, majorId));
    });
}

export function articleApproval(id, majorId, approved) {
  return {
    type: TYPES.APPROVAL,
    payload: {
      method: 'PUT',
      url: majorId ? `/majors/${majorId}/articles/${id}/approval` : `/articles/${id}/approval`,
      fetchParams: { id, ...getCollectionParams(majorId) },
      body: { approved },
      responseSchema: articlesSchema,
    },
  };
}

export function destroyArticle(id, majorId) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: majorId ? `/majors/${majorId}/articles/${id}` : `/articles/${id}`,
      fetchParams: { id, ...getCollectionParams(majorId) },
    },
  };
}

export const resetPagination = resetPaginationActionFactory(TYPES.RESET_PAGINATION);

export default function articlesReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { fetchParams } = payload.request;
      const allPagingFns = [
        majorsApprovedPagingFns,
        majorsPendingPagingFns,
        platformApprovedPagingFns,
        platformPendingPagingFns,
      ];
      return removeFromAllPages(state, allPagingFns, fetchParams);
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

export const getMajorOptionsForArticle = createSelector(
  getMajorOptionsForCurrentUser,
  getArticleEntity,
  (majorOptions, articleEntity) => {
    if (!articleEntity.majorId || find(majorOptions, { value: articleEntity.majorId })) {
      return majorOptions;
    }

    const { majorSummary: { id, name } } = articleEntity;
    return majorOptions.concat({ key: id, value: id, label: name });
  },
);

export function getArticleIdFromProps(props) {
  const { match } = props;
  return +(
    match.params.articleId
    || (match.path.includes('articles/:id') && match.params.id)
    || props.articleId
  );
}
