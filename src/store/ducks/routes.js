import { push, replace } from 'connected-react-router';
import { createSelector } from 'reselect';
import URI from 'urijs';
import humps from 'humps';
import pick from 'lodash/pick';
import routes from '../../lib/routes';

export function goToLanding() {
  return push(routes.landing);
}

export function goToSignIn() {
  return push(routes.signIn);
}

export function goToProfile() {
  return push(routes.profile);
}

export function goToUser(userId) {
  return push(routes.user(userId));
}

export function goToMajor(majorId) {
  return push(routes.major(majorId));
}

export function goToArticles(majorId) {
  return push(routes.articles(majorId));
}

export function goToArticle(id, majorId) {
  return push(routes.article(id, majorId));
}

export function goToDiscussions() {
  return push(routes.discussions);
}

export function goToDiscussion(id) {
  return push(routes.discussion(id));
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

export const getTokensFromSearch = createSelector(
  getSearch,
  (search) => {
    const parsedSearch = humps.camelizeKeys(URI.parseQuery(search));

    if (!parsedSearch.clientId
      || !parsedSearch.token
      || !parsedSearch.uid
      || !parsedSearch.expiry
    ) {
      return undefined;
    }

    return {
      ...pick(parsedSearch, 'uid', 'expiry'),
      client: parsedSearch.clientId,
      'access-token': parsedSearch.token,
      'token-type': 'Bearer',
    };
  },
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
