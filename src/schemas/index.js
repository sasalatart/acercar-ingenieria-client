import { schema } from 'normalizr';

export const majorsSchema = new schema.Entity('majors');

export const majorSummariesSchema = new schema.Entity('majorSummaries');

export const majorsOfInterestSchema = new schema.Entity('majorsOfInterest');

export const userSummariesSchema = new schema.Entity('userSummaries');

export const usersSchema = new schema.Entity('users', {
  majorsOfInterest: [majorsOfInterestSchema],
  adminOfMajors: [majorSummariesSchema],
});

export const announcementsSchema = new schema.Entity('announcements');

export const questionsSchema = new schema.Entity('questions', {
  author: userSummariesSchema,
  majorSummary: majorSummariesSchema,
});

export const articlesSchema = new schema.Entity('articles', {
  author: userSummariesSchema,
  majorSummary: majorSummariesSchema,
});

export const discussionsSchema = new schema.Entity('discussions', {
  author: userSummariesSchema,
});

export const categoriesSchema = new schema.Entity('categories');

export const childCommentsSchema = new schema.Entity('comments', {
  author: userSummariesSchema,
});

export const commentsSchema = new schema.Entity('comments', {
  author: userSummariesSchema,
  childComments: [childCommentsSchema],
});

export const notificationsSchema = new schema.Entity('notifications', {
  notificator: userSummariesSchema,
});
