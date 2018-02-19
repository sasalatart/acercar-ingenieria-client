import { Map } from 'immutable';
import URI from 'urijs';
import { usersSchema } from '../../schemas';
import { majorPaging } from './paginations';

const majorsPagingFns = majorPaging(state => state.admins, usersSchema);

const INITIAL_STATE = Map({
  pagination: new Map({
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
});

const TYPES = {
  LOAD_FROM_MAJOR: 'fetch::admins/LOAD_FROM_MAJOR',
};

export function loadMajorAdmins(majorId, page = 1) {
  return {
    type: TYPES.LOAD_FROM_MAJOR,
    payload: {
      method: 'GET',
      url: URI(`/majors/${majorId}/admins`).query({ page }).toString(),
      urlParams: { majorId, page },
      responseSchema: [usersSchema],
    },
  };
}

export default function adminsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_FROM_MAJOR}_FULFILLED`:
      return majorsPagingFns.update(state, action.payload);
    default:
      return state;
  }
}

export const getMajorAdminEntities = majorsPagingFns.getPagedEntities;

export const getMajorAdminsPaginationMeta = majorsPagingFns.getMeta;