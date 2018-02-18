import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { getEntities } from './entities';
import { usersSchema } from '../../schemas';

const INITIAL_STATE = new Map({
  majorAdminsPagination: new Map({}),
  majorAdminsPaginationMeta: new Map({}),
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
    case `${TYPES.LOAD_FROM_MAJOR}_FULFILLED`: {
      const { pagination, result, request: { urlParams: { majorId } } } = action.payload;
      return state
        .mergeIn(['majorAdminsPagination', majorId], new Map({ [pagination.page]: result }))
        .setIn(['majorAdminsPaginationMeta', majorId], pagination);
    }
    default:
      return state;
  }
}

export const getAdminsData = state => state.admins;

export const getMajorId = (state, params) => params.majorId;

export const getPage = (state, params) => params.page;

export const getPagedMajorAdminIds = createSelector(
  getMajorId,
  getPage,
  getAdminsData,
  (majorId, page, adminsData) =>
    adminsData.getIn(['majorAdminsPagination', majorId, String(page)]),
);

export const getPagedMajorAdminEntities = createSelector(
  getPagedMajorAdminIds,
  getEntities,
  (userIds, entities) =>
    denormalize(userIds, [usersSchema], entities),
);

export const getMajorAdminsPaginationMeta = createSelector(
  getMajorId,
  getAdminsData,
  (majorId, adminsData) => adminsData.getIn(['majorAdminsPaginationMeta', majorId]),
);
