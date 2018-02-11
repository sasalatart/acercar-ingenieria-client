import { push } from 'react-router-redux';

const ROUTES = {
  LANDING: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MAJORS: '/majors',
  ARTICLES: '/articles',
  QUESTIONS: '/questions',
  ABOUT_US: '/about-us',
};

export function goToSignIn() {
  return push(ROUTES.SIGN_IN);
}

export function goToSignUp() {
  return push(ROUTES.SIGN_UP);
}

export default ROUTES;
