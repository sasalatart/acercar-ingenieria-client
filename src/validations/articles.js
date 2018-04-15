import {
  required,
  requiredRichText,
  image,
  maxLength,
  maxFileSize,
  maxSizePerAttachment,
} from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;
const MAX_PICTURE_SIZE_IN_MB = 1;
const MAX_ATTACHMENT_SIZE_IN_MB = 5;

export default t => ({
  required: required(t({ id: 'forms.required' })),
  requiredRichText: requiredRichText(t({ id: 'forms.required' })),
  image: image(t({ id: 'forms.image' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),

  maxPictureSize: maxFileSize(
    t({ id: 'forms.maxFileSize' }, { size: MAX_PICTURE_SIZE_IN_MB }),
    MAX_PICTURE_SIZE_IN_MB * 1024 * 1024,
  ),

  maxSizePerAttachment: maxSizePerAttachment(
    t({ id: 'forms.maxSizePerAttachment' }, { size: MAX_ATTACHMENT_SIZE_IN_MB }),
    MAX_ATTACHMENT_SIZE_IN_MB * 1024 * 1024,
  ),
});
