import keyMirror from 'keymirror';
import mapValues from 'lodash/mapValues';

const ROUTES = {
  LANDING: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  USER: id => `/users/${id}`,
  MAJORS: '/majors',
  MAJOR: id => `/majors/${id}`,
  ARTICLES: majorId => (majorId
    ? `/majors/${majorId}/articles`
    : '/articles'
  ),
  ARTICLE: (id, majorId) => (majorId
    ? `/majors/${majorId}/articles/${id}`
    : `/articles/${id}`
  ),
  ARTICLE_EDIT: (id, majorId) => (majorId
    ? `/majors/${majorId}/articles/${id}/edit`
    : `/articles/${id}/edit`
  ),
  QUESTIONS: '/questions',
  ABOUT_US: '/about-us',
};

export const MAJORS_TAB_NAMES = keyMirror({
  disciplinaries: null, interdisciplinaries: null,
});

export const getProfilePaths = () => {
  const subPaths = {
    info: '',
    edit: '/edit',
    notifications: '/notifications',
    password: '/password',
  };

  return {
    keys: mapValues(subPaths, path => `/profile${path}`),
  };
};

export const getMajorPaths = (majorId) => {
  const subPaths = {
    info: '',
    edit: '/edit',
    admins: '/admins',
    users: '/users',
    answeredQuestions: '/questions',
    pendingQuestions: '/questions/pending',
    articles: '/articles',
    comments: '/comments',
    email: '/email',
  };

  return {
    keys: mapValues(subPaths, path => `/majors/${majorId}${path}`),
    routes: mapValues(subPaths, path => `/majors/:majorId${path}`),
  };
};

export default ROUTES;
