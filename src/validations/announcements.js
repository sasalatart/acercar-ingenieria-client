import {
  required,
  image,
  maxFileSize,
} from './validators';

const MAX_PICTURE_SIZE_IN_MB = 5;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  image: image(t({ id: 'validations.image' })),

  maxPictureSize: maxFileSize(
    t({ id: 'validations.maxFileSize' }, { size: MAX_PICTURE_SIZE_IN_MB }),
    MAX_PICTURE_SIZE_IN_MB * 1024 * 1024,
  ),
});
