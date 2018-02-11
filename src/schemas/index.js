import { schema } from 'normalizr';

export const usersSchema = new schema.Entity('users');

export const announcementsSchema = new schema.Entity('announcements');

export default {
  usersSchema,
  announcementsSchema,
};
