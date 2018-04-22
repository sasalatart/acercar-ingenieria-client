import {
  required,
  url,
  image,
  maxFileSize,
} from './validators';

const MAX_RESOURCE_SIZE_IN_MB = 2;

export default t => ({
  required: required(t({ id: 'forms.required' })),
  resourceUrl: url(t({ id: 'forms.url' })),
  image: image(t({ id: 'forms.image' })),

  maxResourceSize: maxFileSize(
    t({ id: 'forms.maxFileSize' }, { size: MAX_RESOURCE_SIZE_IN_MB }),
    MAX_RESOURCE_SIZE_IN_MB * 1024 * 1024,
  ),
});
