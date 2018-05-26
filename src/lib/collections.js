export const adminsCollection = 'admins';

export const announcementsCollection = 'announcements';

export const articlesCollection = 'articles';

export const categoriesCollection = 'categories';

export const commentsCollection = 'comments';

export const creditsCollection = 'credits';

export const discussionsCollection = 'discussions';

export const enrollmentsCollection = 'enrollments';

export const likesCollection = 'likes';

export const majorsCollection = 'majors';

export const notificationsCollection = 'notifications';

export const questionsCollection = 'questions';

export const usersCollection = 'users';

export const videoLinksCollection = 'videoLinks';

export function parseBaseResource(params) {
  const baseResourceKey = Object.keys(params).find(key => /Id/.test(key));

  if (!baseResourceKey) return undefined;

  return {
    baseResourceName: baseResourceKey.replace('Id', 's'),
    baseResourceId: +params[baseResourceKey],
  };
}
