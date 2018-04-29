import {
  required,
  requiredRichText,
  maxLength,
  minLength,
  maxCSVLength,
  maxSizePerAttachment,
} from './validators';

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 255;
const MAX_TAG_COUNT = 5;
const MAX_ATTACHMENT_SIZE_IN_MB = 5;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  requiredRichText: requiredRichText(t({ id: 'validations.required' })),

  minTitleLength: minLength(
    t({ id: 'validations.minLength' }, { length: MIN_TITLE_LENGTH }),
    MIN_TITLE_LENGTH,
  ),

  maxTitleLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_TITLE_LENGTH }),
    MAX_TITLE_LENGTH,
  ),

  maxTagCount: maxCSVLength(
    t({ id: 'validations.maxOptions' }, { length: MAX_TAG_COUNT }),
    MAX_TAG_COUNT,
  ),

  maxSizePerAttachment: maxSizePerAttachment(
    t({ id: 'validations.maxSizePerAttachment' }, { size: MAX_ATTACHMENT_SIZE_IN_MB }),
    MAX_ATTACHMENT_SIZE_IN_MB * 1024 * 1024,
  ),
});
