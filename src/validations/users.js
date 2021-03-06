import {
  required,
  numeric,
  pucEmail,
  image,
  minLength,
  maxLength,
  isBetween,
  isEqualTo,
  maxFileSize,
} from './validators';

const MIN_PASSWORD_LENGTH = 8;
const MAX_NAME_LENGTH = 25;
const MAX_BIO_LENGTH = 255;
const MIN_GENERATION = 1904;
const MAX_GENERATION = (new Date()).getFullYear();
const MAX_AVATAR_SIZE_IN_MB = 1;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  numeric: numeric(t({ id: 'validations.numeric' })),
  pucEmail: pucEmail(t({ id: 'validations.pucEmail' })),
  image: image(t({ id: 'validations.image' })),

  minPasswordLength: minLength(
    t({ id: 'validations.minLength' }, { length: MIN_PASSWORD_LENGTH }),
    MIN_PASSWORD_LENGTH,
  ),

  confirmsPassword: isEqualTo(
    t({ id: 'validations.isEqualTo' }, { target: t({ id: 'forms.password' }) }),
    'password',
  ),

  maxNameLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_NAME_LENGTH }),
    MAX_NAME_LENGTH,
  ),

  isBetweenYears: isBetween(
    t({ id: 'validations.isBetween' }, { min: MIN_GENERATION, max: MAX_GENERATION }),
    MIN_GENERATION,
    MAX_GENERATION,
  ),

  maxBioLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_BIO_LENGTH }),
    MAX_BIO_LENGTH,
  ),

  maxAvatarSize: maxFileSize(
    t({ id: 'validations.maxFileSize' }, { size: MAX_AVATAR_SIZE_IN_MB }),
    MAX_AVATAR_SIZE_IN_MB * 1024 * 1024,
  ),
});
