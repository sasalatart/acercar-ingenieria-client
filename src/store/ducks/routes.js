import { push, replace } from 'react-router-redux';
import { createSelector } from 'reselect';
import URI from 'urijs';
import pick from 'lodash/pick';
import ROUTES from '../../routes';

export function goToLanding() {
  return push(ROUTES.LANDING);
}

export function goToSignIn() {
  return push(ROUTES.SIGN_IN);
}

export function goToSignUp() {
  return push(ROUTES.SIGN_UP);
}

export function goToProfile() {
  return push(ROUTES.PROFILE);
}

export function goToUser(userId) {
  return push(ROUTES.USER(userId));
}

export function goToMajorsNew() {
  return push(ROUTES.MAJORS_NEW);
}

export function goToMajor(majorId) {
  return push(ROUTES.MAJOR(majorId));
}

export function goToArticles(majorId) {
  return push(ROUTES.ARTICLES(majorId));
}

export function goToArticle(id, majorId) {
  return push(ROUTES.ARTICLE(id, majorId));
}

export function goToArticleEdit(id, majorId) {
  return push(ROUTES.ARTICLE_EDIT(id, majorId));
}

export function goToDiscussions() {
  return push(ROUTES.DISCUSSIONS);
}

export function goToDiscussion(id) {
  return push(ROUTES.DISCUSSION(id));
}

/* eslint-disable no-use-before-define */
export function removeQueriesFromCurrentUri(queries) {
  return (dispatch, getState) => {
    const state = getState();

    const pathname = getPathname(state);
    const newQuery = URI(getSearch(state)).removeQuery(queries);
    dispatch(replace(`${pathname}${newQuery.toString()}`));
  };
}

export function addQueryToCurrentUri(query, reset) {
  return (dispatch, getState) => {
    const state = getState();

    const pathname = getPathname(state);
    const newQuery = reset
      ? URI('').setQuery(query)
      : URI(getSearch(state)).removeQuery(Object.keys(query)).addQuery(query);

    dispatch(replace(`${pathname}${newQuery.toString()}`));
  };
}
/* eslint-enable no-use-before-define */

export const getRouterData = state => state.router;

export const getLocation = createSelector(
  getRouterData,
  routerData => routerData.location,
);

export const getPathname = createSelector(
  getLocation,
  location => location && location.pathname,
);

export const getSearch = createSelector(
  getLocation,
  location => location && location.search,
);

const getFilters = (state, params) => params.filters;

export const getActiveFilters = createSelector(
  getSearch,
  getFilters,
  (search, filters) => pick(URI.parseQuery(search), filters),
);

export const getFiltersActive = createSelector(
  getActiveFilters,
  activeFilters => Object.keys(activeFilters).length > 0,
);

export const getPage = createSelector(
  getSearch,
  (search) => {
    const query = URI.parseQuery(search);
    return query.page && +query.page;
  },
);

export default ROUTES;
