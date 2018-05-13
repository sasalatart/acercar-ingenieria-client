import {
  required,
  requiredRichText,
  image,
  maxLength,
  maxFileSize,
  maxSizePerAttachment,
} from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;
const MAX_PREVIEW_SIZE_IN_MB = 2;
const MAX_ATTACHMENT_SIZE_IN_MB = 5;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  requiredRichText: requiredRichText(t({ id: 'validations.required' })),
  image: image(t({ id: 'validations.image' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),

  maxPreviewSize: maxFileSize(
    t({ id: 'validations.maxFileSize' }, { size: MAX_PREVIEW_SIZE_IN_MB }),
    MAX_PREVIEW_SIZE_IN_MB * 1024 * 1024,
  ),

  maxSizePerAttachment: maxSizePerAttachment(
    t({ id: 'validations.maxSizePerAttachment' }, { size: MAX_ATTACHMENT_SIZE_IN_MB }),
    MAX_ATTACHMENT_SIZE_IN_MB * 1024 * 1024,
  ),
});
