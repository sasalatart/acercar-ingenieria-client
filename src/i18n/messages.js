import routing from './routing';
import forms from './forms';
import notifications from './notifications';
import auth from './auth';
import users from './users';
import announcements from './announcements';
import majors from './majors';
import questions from './questions';
import articles from './articles';
import categories from './categories';
import comments from './comments';
import admins from './admins';
import emails from './emails';
import aboutUs from './about-us';
import errors from './errors';

const enUS = 'en-US';
const esES = 'es-ES';

const messages = { [enUS]: {}, [esES]: {} };

[
  routing,
  forms,
  notifications,
  auth,
  users,
  announcements,
  majors,
  questions,
  articles,
  categories,
  comments,
  admins,
  emails,
  aboutUs,
  errors,
].forEach((translations) => {
  Object.assign(messages[enUS], translations[enUS]);
  Object.assign(messages[esES], translations[esES]);
});

export default messages;
