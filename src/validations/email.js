import {
  required,
  requiredRichText,
  maxLength,
} from './validators';

const MAX_LENGTH = 100;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  requiredRichText: requiredRichText(t({ id: 'validations.required' })),

  maxLength: maxLength(
    t({ id: 'validations.maxLength' }, { length: MAX_LENGTH }),
    MAX_LENGTH,
  ),
});
