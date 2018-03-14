import { required, maxLength, minLength } from './validators';

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 255;
const MAX_TAG_COUNT = 5;

export default t => ({
  required: required(t({ id: 'forms.required' })),

  minTitleLength: minLength(
    t({ id: 'forms.minLength' }, { length: MIN_TITLE_LENGTH }),
    MIN_TITLE_LENGTH,
  ),

  maxTitleLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_TITLE_LENGTH }),
    MAX_TITLE_LENGTH,
  ),

  maxTagCount: maxLength(
    t({ id: 'forms.maxOptions' }, { length: MAX_TAG_COUNT }),
    MAX_TAG_COUNT,
  ),
});
