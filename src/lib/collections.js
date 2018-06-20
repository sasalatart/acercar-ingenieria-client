import keyMirror from 'keymirror';

export function parseBaseResource(params) {
  const baseResourceKey = Object.keys(params).find(key => /Id/.test(key));

  if (!baseResourceKey) return undefined;

  return {
    baseResourceName: baseResourceKey.replace('Id', 's'),
    baseResourceId: +params[baseResourceKey],
  };
}

export default keyMirror({
  admins: null,
  announcements: null,
  articles: null,
  categories: null,
  comments: null,
  credits: null,
  discussions: null,
  enrollments: null,
  likes: null,
  majors: null,
  notifications: null,
  questions: null,
  users: null,
  videoLinks: null,
});
