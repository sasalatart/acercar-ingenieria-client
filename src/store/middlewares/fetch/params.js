import humps from 'humps';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import objectToFormData from 'object-to-formdata';

const REQUEST_KEYS = ['headers', 'method', 'url', 'query', 'body'];

function getFileKeys(body) {
  if (!body) {
    return undefined;
  }

  const fileKeys = [];
  Object.keys(body).forEach((key) => {
    const data = body[key];
    const isFile = data instanceof File || (data instanceof Array && data[0] instanceof File);
    if (isFile) fileKeys.push(key);
  });

  return fileKeys;
}

function buildFormData(payload, params, fileKeys) {
  const formData = objectToFormData(omit(params.body, fileKeys));

  fileKeys.forEach((fileKey) => {
    if (payload.body[fileKey] instanceof File) {
      formData.append(fileKey, payload.body[fileKey]);
      return;
    }

    payload.body[fileKey].forEach((file) => {
      formData.append(`${fileKey}[]`, file);
    });
  });

  return formData;
}

export default function buildParams(payload, tokens, locale) {
  const decamelizedPayload = humps.decamelizeKeys(pick(payload, REQUEST_KEYS));
  const query = { ...decamelizedPayload.query, locale: locale.split('-')[0] };

  const params = {
    headers: { ...tokens },
    ...decamelizedPayload,
    query,
    credentials: 'include',
  };

  const fileKeys = getFileKeys(payload.body);
  if (isEmpty(fileKeys)) {
    params.headers['Content-Type'] = 'application/json';
    params.body = JSON.stringify(params.body);
  } else {
    params.body = buildFormData(payload, params, fileKeys);
  }

  return params;
}
