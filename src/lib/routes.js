import keyMirror from 'keymirror';
import mapValues from 'lodash/mapValues';

function urlSuffix(suffix) {
  return suffix ? `/${suffix}` : '';
}

const routes = {
  landing: '/',

  announcements: '/announcements',

  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  passwordRecovery: '/auth/password/recover',
  passwordEdit: '/auth/password/edit',

  users: '/users',
  user: id => `/users/${id}`,

  profile: '/users/profile',
  profileNotifications: seen => (seen
    ? '/users/profile/notifications/seen'
    : '/users/profile/notifications'
  ),
  profileEdit: '/users/profile/edit',
  profilePassword: '/users/profile/password',

  majors: '/majors',
  majorsNew: '/majors/new',
  major: id => `/majors/${id}`,
  majorEdit: id => `/majors/${id}/edit`,

  articles: (majorId, suffix) => (majorId
    ? `/majors/${majorId}/articles${urlSuffix(suffix)}`
    : `/articles${urlSuffix(suffix)}`
  ),
  articlesNew: majorId => (majorId
    ? `/majors/${majorId}/articles/new`
    : '/articles/new'
  ),
  article: (id, majorId) => (majorId
    ? `/majors/${majorId}/articles/${id}`
    : `/articles/${id}`
  ),
  articleEdit: (id, majorId) => (majorId
    ? `/majors/${majorId}/articles/${id}/edit`
    : `/articles/${id}/edit`
  ),

  questions: (majorId, suffix) => (majorId
    ? `/majors/${majorId}/questions${urlSuffix(suffix)}`
    : `/questions${urlSuffix(suffix)}`
  ),

  discussions: '/discussions',
  discussionsMine: '/discussions/mine',
  discussionsNew: '/discussions/new',
  discussion: id => `/discussions/${id}`,
  discussionEdit: id => `/discussions/${id}/edit`,

  comment: (id, baseResourceName, baseResourceId) => (baseResourceName
    ? `/${baseResourceName}/${baseResourceId}/comments/${id}`
    : `/comments/${id}`),

  aboutUs: '/about-us',

  credits: '/credits',
};

export const MAJORS_TAB_NAMES = keyMirror({
  disciplinaries: null, interdisciplinaries: null,
});

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
  };

  return {
    keys: mapValues(subPaths, path => `/majors/${majorId}${path}`),
    routes: mapValues(subPaths, path => `/majors/:majorId${path}`),
  };
};

export const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const BASE_CLIENT_URL = process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000';

export default routes;
