import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import URI from 'urijs';
import { articlesSchema } from '../../schemas';
import { removeEntity } from './entities';
import { majorPaging } from './paginations';
import { articleDestroyedNotification } from './notifications';

const majorsPagingFns = majorPaging(state => state.articles, articlesSchema);

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
  destroyingIds: new Set(),
});

const TYPES = {
  LOAD: 'fetch::articles/LOAD',
  DESTROY: 'fetch::articles/DESTROY',
  SET_DESTROYING: 'articles/SET_DESTROYING',
};

export function loadArticles(page = 1, majorId) {
  const uri = majorId
    ? URI(`/majors/${majorId}/articles`)
    : URI('/articles');

  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: uri.query({ page }).toString(),
      urlParams: { page, majorId },
      responseSchema: [articlesSchema],
    },
  };
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
      dispatch(articleDestroyedNotification());
      dispatch(removeEntity('articles', id));
    });
  };
}

export function getPagingFns(isOfMajor) {
  return isOfMajor ? majorsPagingFns : undefined;
}

function getPagingFnsFromAction(payload) {
  const { majorId } = payload.request.urlParams;
  return getPagingFns(majorId);
}

export default function articlesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return getPagingFns(action.payload.request.urlParams.majorId).update(state, action.payload);
    case `${TYPES.DESTROY}_FULFILLED`:
      return getPagingFnsFromAction(action.payload)
        .destroy(state, action.payload.request.urlParams)
        .update('destroyingIds', ids => ids.delete(action.payload.request.urlParams.id));
    case TYPES.SET_DESTROYING:
      return state.update('destroyingIds', ids => ids.add(action.payload.id));
    default:
      return state;
  }
}

const getArticlesData = state => state.questions;

export const getDestroyingIds = createSelector(
  getArticlesData,
  articlesData => articlesData.get('destroyingIds'),
);
