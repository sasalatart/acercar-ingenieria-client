import routing from './routing';
import forms from './forms';
import notifications from './notifications';
import auth from './auth';
import users from './users';
import majors from './majors';
import questions from './questions';
import articles from './articles';
import categories from './categories';
import comments from './comments';
import admins from './admins';
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
  majors,
  questions,
  articles,
  categories,
  comments,
  admins,
  errors,
].forEach((translations) => {
  Object.assign(messages[enUS], translations[enUS]);
  Object.assign(messages[esES], translations[esES]);
});

export default messages;
