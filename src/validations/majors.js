import {
  required,
  requiredRichText,
  url,
  image,
  maxLength,
  maxFileSize,
} from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;
const MAX_LOGO_SIZE_IN_MB = 2;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  requiredRichText: requiredRichText(t({ id: 'validations.required' })),
  videoUrl: url(t({ id: 'validations.url' })),
  image: image(t({ id: 'validations.image' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),

  maxLogoSize: maxFileSize(
    t({ id: 'validations.maxFileSize' }, { size: MAX_LOGO_SIZE_IN_MB }),
    MAX_LOGO_SIZE_IN_MB * 1024 * 1024,
  ),
});
