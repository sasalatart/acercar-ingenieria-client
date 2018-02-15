import {
  required,
  pucEmail,
  minLength,
  maxLength,
  isBetween,
  isEqualTo,
} from './validators';

const MIN_PASSWORD_LENGTH = 8;
const MAX_NAME_LENGTH = 25;
const MAX_BIO_LENGTH = 255;
const MIN_GENERATION = 1904;
const MAX_GENERATION = (new Date()).getFullYear();

export default t => ({
  required: required(t({ id: 'forms.required' })),
  pucEmail: pucEmail(t({ id: 'forms.pucEmail' })),

  minPasswordLength: minLength(
    t({ id: 'forms.minLength' }, { length: MIN_PASSWORD_LENGTH }),
    MIN_PASSWORD_LENGTH,
  ),

  confirmsPassword: isEqualTo(
    t({ id: 'forms.isEqualTo' }, { target: t({ id: 'forms.password' }) }),
    'password',
  ),

  maxNameLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_NAME_LENGTH }),
    MAX_NAME_LENGTH,
  ),

  isBetweenYears: isBetween(
    t({ id: 'forms.isBetween' }, { min: MIN_GENERATION, max: MAX_GENERATION }),
    MIN_GENERATION,
    MAX_GENERATION,
  ),

  maxBioLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_BIO_LENGTH }),
    MAX_BIO_LENGTH,
  ),
});
