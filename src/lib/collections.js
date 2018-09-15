import keyMirror from 'keymirror';

export function parseBaseCollection(params) {
  const baseKey = Object.keys(params).find(key => /Id/.test(key));

  if (!baseKey) return undefined;

  return {
    baseCollection: baseKey.replace('Id', 's'),
    baseId: +params[baseKey],
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
