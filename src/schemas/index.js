import { schema } from 'normalizr';
import omit from 'lodash/omit';

export const majorSummariesSchema = new schema.Entity('majorSummaries');

export const usersSchema = new schema.Entity('users', {
  majorsOfInterest: [majorSummariesSchema],
  adminOfMajors: [majorSummariesSchema],
}, {
  processStrategy: (value) => {
    const newValue = omit(value, 'majors');
    newValue.majorsOfInterest = value.majors;
    return newValue;
  },
});

export const announcementsSchema = new schema.Entity('announcements');

export default {
  usersSchema,
  announcementsSchema,
};
