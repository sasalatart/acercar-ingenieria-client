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
  NOTIFICATIONS: seen => (seen
    ? '/users/profile/notifications/seen'
    : '/users/profile/notifications'
  ),
  USER: id => `/users/${id}`,
  MAJORS: '/majors',
  MAJORS_NEW: '/majors/new',
  MAJOR: id => `/majors/${id}`,
  MAJOR_EDIT: id => `/majors/${id}/edit`,
  ARTICLES: (majorId, suffix) => {
    const urlSuffix = suffix ? `/${suffix}` : '';
    return majorId ? `/majors/${majorId}/articles${urlSuffix}` : `/articles${urlSuffix}`;
  },
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
  COMMENT: (id, baseResourceName, baseResourceId) => (baseResourceName
    ? `/${baseResourceName}/${baseResourceId}/comments/${id}`
    : `/comments/${id}`),
  ABOUT_US: '/about-us',
  CREDITS: '/credits',
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
    videoLinks: '/video-links',
    admins: '/admins',
    users: '/users',
    questions: '/questions',
    articles: '/articles',
    articlesMine: '/articles/mine',
    articlesPending: '/articles/pending',
    article: '/articles/:id',
    articlesNew: '/articles/new',
    articleEdit: '/articles/:id/edit',
    comments: '/comments',
  };

  return {
    keys: mapValues(subPaths, path => `/majors/${majorId}${path}`),
    routes: mapValues(subPaths, path => `/majors/:majorId${path}`),
  };
};

export function parseBaseResource(params) {
  const baseResourceKey = Object.keys(params).find(key => /Id/.test(key));

  if (!baseResourceKey) return undefined;

  return {
    baseResourceName: baseResourceKey.replace('Id', 's'),
    baseResourceId: +params[baseResourceKey],
  };
}

export default ROUTES;
