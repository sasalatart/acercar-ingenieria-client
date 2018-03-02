import { required, maxLength } from './validators';

const MAX_LENGTH = 1000;

export default t => ({
  required: required(t({ id: 'forms.required' })),

  maxLength: maxLength(
    t({ id: 'forms.maxLength' }, { length: MAX_LENGTH }),
    MAX_LENGTH,
  ),
});
