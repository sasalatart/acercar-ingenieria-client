import {
  required,
  image,
  maxFileSize,
} from './validators';

const MAX_PICTURE_SIZE_IN_MB = 5;

export default t => ({
  required: required(t({ id: 'forms.required' })),
  image: image(t({ id: 'forms.image' })),

  maxPictureSize: maxFileSize(
    t({ id: 'forms.maxFileSize' }, { size: MAX_PICTURE_SIZE_IN_MB }),
    MAX_PICTURE_SIZE_IN_MB * 1024 * 1024,
  ),
});
