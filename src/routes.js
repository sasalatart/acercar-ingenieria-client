import { push, replace } from 'react-router-redux';
import URI from 'urijs';
import { TAB_NAMES as MAJOR_TABS } from './components/Major';

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

export function changeTab(uri, tab) {
  return replace(URI(uri).query({ tab }).toString());
}

export function changeProfileTab(tab) {
  return changeTab(ROUTES.PROFILE, tab);
}

export function changeMajorsTab(tab) {
  return changeTab(ROUTES.MAJORS, tab);
}

export function changeMajorTab(majorId, tab = MAJOR_TABS.info) {
  return changeTab(ROUTES.MAJOR(majorId), tab);
}

export function getActiveTab(search, tabNames, defaultTab) {
  const urlSearchParams = new URLSearchParams(search);
  const activeTab = urlSearchParams.get('tab');
  return tabNames[activeTab] || defaultTab;
}

export default ROUTES;
