import {
  required,
  url,
  image,
  maxLength,
  maxFileSize,
} from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;
const MAX_LOGO_SIZE_IN_MB = 2;

export default t => ({
  required: required(t({ id: 'forms.required' })),
  videoUrl: url(t({ id: 'forms.url' })),
  image: image(t({ id: 'forms.image' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),

  maxLogoSize: maxFileSize(
    t({ id: 'forms.maxFileSize' }, { size: MAX_LOGO_SIZE_IN_MB }),
    MAX_LOGO_SIZE_IN_MB * 1024 * 1024,
  ),
});
