import { required, maxLength } from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;

export default t => ({
  required: required(t({ id: 'forms.required' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),
});
