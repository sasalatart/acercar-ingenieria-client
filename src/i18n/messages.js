import routing from './routing';
import forms from './forms';
import auth from './auth';
import profile from './profile';
import majors from './majors';
import errors from './errors';

const enUS = 'en-US';
const esES = 'es-ES';

const messages = { [enUS]: {}, [esES]: {} };

[routing, forms, auth, profile, majors, errors].forEach((translations) => {
  Object.assign(messages[enUS], translations[enUS]);
  Object.assign(messages[esES], translations[esES]);
});

export default messages;
