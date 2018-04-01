import forms from './forms';
import notifications from './notifications';
import sessions from './sessions';
import users from './users';
import announcements from './announcements';
import majors from './majors';
import questions from './questions';
import articles from './articles';
import discussions from './discussions';
import categories from './categories';
import comments from './comments';
import admins from './admins';
import emails from './emails';
import aboutUs from './about-us';
import search from './search';
import misc from './misc';

const enUS = 'en-US';
const esES = 'es-ES';

const messages = { [enUS]: {}, [esES]: {} };

[
  forms,
  notifications,
  sessions,
  users,
  announcements,
  majors,
  questions,
  articles,
  discussions,
  categories,
  comments,
  admins,
  emails,
  aboutUs,
  search,
  misc,
].forEach((translations) => {
  Object.assign(messages[enUS], translations[enUS]);
  Object.assign(messages[esES], translations[esES]);
});

export default messages;
