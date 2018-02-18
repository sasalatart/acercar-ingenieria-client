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
  major: majorSummariesSchema,
});
