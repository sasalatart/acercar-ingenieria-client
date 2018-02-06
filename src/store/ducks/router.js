import { push } from 'react-router-redux';

const ROUTES = {
  LANDING: '/',
  MAJORS: '/majors',
};

export function goToLanding() {
  return push(ROUTES.LANDING);
}

export function goToMajors() {
  return push(ROUTES.MAJORS);
}
