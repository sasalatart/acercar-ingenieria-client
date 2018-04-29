import { required, url } from './validators';

export default t => ({
  required: required(t({ id: 'validations.required' })),
  url: url(t({ id: 'validations.url' })),
});
