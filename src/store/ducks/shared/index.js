import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';

export const getId = (state, params) => params.id;

export function fulfilledType(type) {
  return `${type}_FULFILLED`;
}

export function withFulfilledTypes(types) {
  return { ...types, ...mapKeys(mapValues(types, fulfilledType), (_, key) => fulfilledType(key)) };
}

export function getPlaceholderFlags(requestLoading, resource) {
  return {
    loading: requestLoading && isEmpty(resource),
    noData: !requestLoading && isEmpty(resource),
  };
}
