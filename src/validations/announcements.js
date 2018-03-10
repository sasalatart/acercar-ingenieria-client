import { required } from './validators';

export default t => ({
  required: required(t({ id: 'forms.required' })),
});
