import humps from 'humps';
import get from 'lodash/get';
import { normalize } from 'normalizr';

export default async function parseResponse(body, headers, payload) {
  const responseSchema = get(payload, 'responseSchema');
  const camelizedBody = humps.camelizeKeys(body.data || body);
  const parsedResponse = responseSchema
    ? normalize(camelizedBody, responseSchema)
    : camelizedBody;

  parsedResponse.request = payload;

  const perPage = +headers.get('x-per-page');
  if (perPage) {
    const total = +headers.get('x-total');
    parsedResponse.paginationInfo = {
      page: +headers.get('x-page'),
      totalPages: Math.ceil(total / perPage),
      perPage,
      totalRecords: total,
    };
  }

  return parsedResponse;
}
