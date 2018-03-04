import humps from 'humps';
import get from 'lodash/get';
import { normalize } from 'normalizr';

export default async function parseResponse(body, headers, payload) {
  const responseSchema = get(payload, 'responseSchema');
  const camelizedBody = humps.camelizeKeys(body.data || body);
  const parsedResponse = responseSchema
    ? normalize(camelizedBody, responseSchema)
    : camelizedBody;

  Object.assign(parsedResponse, { request: payload });

  const perPage = +headers.get('per-page');
  if (perPage) {
    const total = +headers.get('total');
    const pagination = {
      page: +payload.urlParams.page,
      totalPages: Math.ceil(total / perPage),
      perPage,
      totalRecords: total,
    };

    Object.assign(parsedResponse, { pagination });
  }

  return parsedResponse;
}
