import keyMirror from 'keymirror';
import mapValues from 'lodash/mapValues';

const ROUTES = {
  LANDING: '/',
  ANNOUNCEMENTS: '/announcements',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  RECOVER_PASSWORD: '/auth/password/recover',
  EDIT_PASSWORD: '/auth/password/edit',
  USERS: '/users',
  PROFILE: '/users/profile',
  USER: id => `/users/${id}`,
  MAJORS: '/majors',
  MAJORS_NEW: '/majors/new',
  MAJOR: id => `/majors/${id}`,
  MAJOR_EDIT: id => `/majors/${id}/edit`,
  ARTICLES: majorId => (majorId
    ? `/majors/${majorId}/articles`
    : '/articles'
  ),
  ARTICLES_NEW: majorId => (majorId
    ? `/majors/${majorId}/articles/new`
    : '/articles/new'
  ),
  ARTICLE: (id, majorId) => (majorId
    ? `/majors/${majorId}/articles/${id}`
    : `/articles/${id}`
  ),
  ARTICLE_EDIT: (id, majorId) => (majorId
    ? `/majors/${majorId}/articles/${id}/edit`
    : `/articles/${id}/edit`
  ),
  QUESTIONS: majorId => (majorId
    ? `/majors/${majorId}/questions`
    : '/questions'
  ),
  PENDING_QUESTIONS: majorId => (majorId
    ? `/majors/${majorId}/questions/pending`
    : '/questions/pending'
  ),
  DISCUSSIONS: '/discussions',
  MY_DISCUSSIONS: '/discussions/mine',
  DISCUSSIONS_NEW: '/discussions/new',
  DISCUSSION: id => `/discussions/${id}`,
  DISCUSSION_EDIT: id => `/discussions/${id}/edit`,
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
    keys: mapValues(subPaths, path => `/users/profile${path}`),
  };
};

export const getMajorPaths = (majorId) => {
  const subPaths = {
    info: '',
    edit: '/edit',
    admins: '/admins',
    users: '/users',
    questions: '/questions',
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
