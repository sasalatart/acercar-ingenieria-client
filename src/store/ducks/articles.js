import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import find from 'lodash/find';
import { goToArticle } from './routes';
import { getIsRequestingFactory } from './loading';
import { getEntityFactory } from './entities';
import { getMajorOptionsForCurrentUser } from './sessions';
import { fulfilledType, withFulfilledTypes } from './shared';
import paginationReducerFactory, { paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { articlesSchema, articleSummariesSchema } from '../../schemas';
import { suffixes, getLoadIndexType, getPaginationKey } from '../../lib/articles';
import collections from '../../lib/collections';

const TYPES = withFulfilledTypes({
  LOAD_PLATFORM_APPROVED: 'articles/LOAD_PLATFORM_APPROVED',
  LOAD_PLATFORM_MINE: 'articles/LOAD_PLATFORM_MINE',
  LOAD_PLATFORM_UNAPPROVED: 'articles/LOAD_PLATFORM_UNAPPROVED',
  LOAD_MAJORS_APPROVED: 'articles/LOAD_MAJORS_APPROVED',
  LOAD_MAJORS_MINE: 'articles/LOAD_MAJORS_MINE',
  LOAD_MAJORS_UNAPPROVED: 'articles/LOAD_MAJORS_UNAPPROVED',
  LOAD: 'articles/LOAD',
  CREATE: 'articles/CREATE',
  UPDATE: 'articles/UPDATE',
  TOGGLE_APPROVAL: 'articles/TOGGLE_APPROVAL',
  DESTROY: 'articles/DESTROY',
  RESET_PAGINATION: 'articles/RESET_PAGINATION',
});

function reducerFactory(setType) {
  return paginationReducerFactory({
    setPage: fulfilledType(setType),
    removeFromPages: TYPES.DESTROY_FULFILLED,
    resetPagination: TYPES.RESET_PAGINATION,
  });
}

export default combineReducers({
  platformApproved: reducerFactory(TYPES.LOAD_PLATFORM_APPROVED),
  platformMine: reducerFactory(TYPES.LOAD_PLATFORM_MINE),
  platformUnapproved: reducerFactory(TYPES.LOAD_PLATFORM_UNAPPROVED),
  majorsApproved: reducerFactory(TYPES.LOAD_MAJORS_APPROVED),
  majorsMine: reducerFactory(TYPES.LOAD_MAJORS_MINE),
  majorsUnapproved: reducerFactory(TYPES.LOAD_MAJORS_UNAPPROVED),
});

export function loadArticles({ query, baseId, suffix }) {
  const types = { LOAD_INDEX: getLoadIndexType(TYPES, baseId, suffix) };
  const urlOptions = {
    collection: collections.articles,
    baseCollection: collections.majors,
    suffix: suffix !== suffixes.approved ? suffix : undefined,
  };
  const { loadIndex } = crudActionsFactory(types, articleSummariesSchema, urlOptions);
  return dispatch => dispatch(loadIndex({ query, baseId }));
}

const {
  load, create, update, destroy,
} = crudActionsFactory(TYPES, articlesSchema, { baseCollection: collections.majors });

export const loadArticle = load;

export const createArticle = (body, baseId) =>
  dispatch => dispatch(create(body, baseId))
    .then(({ value: { result } }) => dispatch(goToArticle(result, baseId)));

export const updateArticle = (id, body, baseId) =>
  dispatch => dispatch(update(id, body))
    .then(() => dispatch(goToArticle(id, baseId)));

export const destroyArticle = destroy;

export function toggleArticleApproval(id, approved, baseId) {
  return {
    type: TYPES.TOGGLE_APPROVAL,
    payload: {
      method: 'PUT',
      url: baseId
        ? `/majors/${baseId}/articles/${id}/approval`
        : `/articles/${id}/approval`,
      body: { approved },
      responseSchema: articlesSchema,
    },
    meta: { id, baseId },
  };
}

export const resetPagination = () => ({ type: TYPES.RESET_PAGINATION });

const getArticlesState = state => state.articles;

export function getPaginationData(state, params) {
  return paginationDataSelectorFactory(
    getArticlesState,
    getPaginationKey(params.baseId, params.suffix),
    articleSummariesSchema,
  )(state, params);
}

export const getArticleEntity = getEntityFactory(articlesSchema);

export const getArticleSummaryEntity = getEntityFactory(articleSummariesSchema);

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

export function getIsLoadingArticles(state, props) {
  const type = getLoadIndexType(TYPES, props.baseId, props.suffix);
  return getIsRequestingFactory(type)(state, props);
}

export const getIsLoadingArticle = getIsRequestingFactory(TYPES.LOAD);
export const getIsTogglingArticleApproval = getIsRequestingFactory(TYPES.TOGGLE_APPROVAL);
export const getIsDestroyingArticle = getIsRequestingFactory(TYPES.DESTROY);
