import { push, replace } from 'react-router-redux';
import { createSelector } from 'reselect';
import URI from 'urijs';
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

export function goToDiscussion(id) {
  return push(ROUTES.DISCUSSION(id));
}

export function addQueryToCurrentUri(query) {
  return (dispatch, getState) => {
    // eslint-disable-next-line no-use-before-define
    const newUri = URI(getSearch(getState())).query(query).toString();
    dispatch(replace(newUri));
  };
}

export const getRouterData = state => state.router;

export const getPathname = createSelector(
  getRouterData,
  routerData => routerData.location.pathname,
);

export const getSearch = createSelector(
  getRouterData,
  routerData => routerData.location.search,
);

export const getPage = createSelector(
  getSearch,
  (search) => {
    const urlSearchParams = new URLSearchParams(search);
    return +urlSearchParams.get('page') || 1;
  },
);

export default ROUTES;
