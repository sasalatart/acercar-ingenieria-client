import { push } from 'react-router-redux';

const ROUTES = {
  LANDING: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
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

export default ROUTES;
