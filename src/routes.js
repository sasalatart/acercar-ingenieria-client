import { push, replace } from 'react-router-redux';
import URI from 'urijs';
import keyMirror from 'keymirror';

const ROUTES = {
  LANDING: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  USER: id => `/users/${id}`,
  MAJORS: '/majors',
  MAJOR: id => `/majors/${id}`,
  ARTICLES: '/articles',
  QUESTIONS: '/questions',
  ABOUT_US: '/about-us',
};

export const PROFILE_TAB_NAMES = keyMirror({
  info: null, notifications: null, edit: null, changePassword: null,
});

export const MAJORS_TAB_NAMES = keyMirror({
  disciplinaries: null, interdisciplinaries: null,
});

export const MAJOR_TAB_NAMES = keyMirror({
  info: null,
  edit: null,
  admins: null,
  interestedUsers: null,
  questions: null,
  pendingQuestions: null,
  articles: null,
  comments: null,
  email: null,
});

export function goToLanding() {
  return push(ROUTES.LANDING);
}

export function goToSignIn() {
  return push(ROUTES.SIGN_IN);
}

export function goToSignUp() {
  return push(ROUTES.SIGN_UP);
}

export function goToMajor(majorId) {
  return push(ROUTES.MAJOR(majorId));
}

export function goToUser(userId) {
  return push(ROUTES.USER(userId));
}

export function changeTab(uri, tab) {
  return replace(URI(uri).query({ tab }).toString());
}

export function addQueryToUri(uri, query) {
  return replace(URI(uri).query(query).toString());
}

export function getActivePage(search) {
  const urlSearchParams = new URLSearchParams(search);
  return urlSearchParams.get('page') || 1;
}

export default ROUTES;
