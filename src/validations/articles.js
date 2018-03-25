import {
  required,
  image,
  maxLength,
  maxFileSize,
} from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;
const MAX_PICTURE_SIZE_IN_MB = 1;

export default t => ({
  required: required(t({ id: 'forms.required' })),
  image: image(t({ id: 'forms.image' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),

  maxPictureSize: maxFileSize(
    t({ id: 'forms.maxFileSize' }, { size: MAX_PICTURE_SIZE_IN_MB }),
    MAX_PICTURE_SIZE_IN_MB * 1024 * 1024,
  ),
});
