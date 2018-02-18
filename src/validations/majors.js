import { required, url, maxLength } from './validators';

const MAX_SHORT_DESCRIPTION_LENGTH = 300;

export default t => ({
  required: required(t({ id: 'forms.required' })),
  videoUrl: url(t({ id: 'forms.url' })),

  maxShortDescriptionLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_SHORT_DESCRIPTION_LENGTH }),
    MAX_SHORT_DESCRIPTION_LENGTH,
  ),
});
