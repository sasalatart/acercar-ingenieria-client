import { schema } from 'normalizr';

export const majorsSchema = new schema.Entity('majors');

export const majorSummariesSchema = new schema.Entity('majorSummaries');

export const majorsOfInterestSchema = new schema.Entity('majorsOfInterest');

export const usersSchema = new schema.Entity('users', {
  majorsOfInterest: [majorsOfInterestSchema],
  adminOfMajors: [majorSummariesSchema],
});

export const announcementsSchema = new schema.Entity('announcements');

export const questionsSchema = new schema.Entity('questions', {
  author: usersSchema,
  majorSummary: majorSummariesSchema,
});

export const articlesSchema = new schema.Entity('articles', {
  author: usersSchema,
  majorSummary: majorSummariesSchema,
});

export const categoriesSchema = new schema.Entity('categories');

export const childCommentsSchema = new schema.Entity('comments', {
  author: usersSchema,
});

export const commentsSchema = new schema.Entity('comments', {
  author: usersSchema,
  childComments: [childCommentsSchema],
});
