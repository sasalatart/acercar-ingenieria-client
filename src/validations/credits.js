import {
  required,
  url,
  image,
  maxFileSize,
} from './validators';

const MAX_RESOURCE_SIZE_IN_MB = 2;

export default t => ({
  required: required(t({ id: 'validations.required' })),
  resourceUrl: url(t({ id: 'validations.url' })),
  image: image(t({ id: 'validations.image' })),

  maxResourceSize: maxFileSize(
    t({ id: 'validations.maxFileSize' }, { size: MAX_RESOURCE_SIZE_IN_MB }),
    MAX_RESOURCE_SIZE_IN_MB * 1024 * 1024,
  ),
});
