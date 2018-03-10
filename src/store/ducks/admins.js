import { Map } from 'immutable';
import URI from 'urijs';
import { usersSchema } from '../../schemas';
import {
  pagingFnsFactory,
  nestedPagingFnsFactory,
} from './paginations';
import { TYPES as USERS_TYPES } from './users';

const platformPagingFns = pagingFnsFactory('admins', usersSchema);
const majorsPagingFns = nestedPagingFnsFactory('admins', usersSchema, 'majors');

const INITIAL_STATE = Map({
  pagination: new Map({
    platform: new Map({}),
    platformMeta: new Map({}),
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
});

const TYPES = {
  LOAD: 'fetch::admins/LOAD',
};

export function getPagingFns(isOfMajor) {
  return isOfMajor ? majorsPagingFns : platformPagingFns;
}

export function loadAdmins(page, majorId) {
  const baseUrl = majorId ? `/majors/${majorId}/admins` : 'users/admins';

  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: URI(baseUrl).query({ page }).toString(),
      urlParams: { page, majorId },
      responseSchema: [usersSchema],
    },
  };
}

export default function adminsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(majorId).update(state, action.payload);
    }
    case `${USERS_TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromMajors = majorsPagingFns.destroy(state, urlParams);
      return platformPagingFns.destroy(fromMajors, urlParams);
    }
    default:
      return state;
  }
}
