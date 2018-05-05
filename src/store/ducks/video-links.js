import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { videoLinksSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory, { prepareGetPagingFns } from './paginations';
import { getVideoLinkId } from './shared';

export const collection = 'videoLinks';

const majorsPagingFns = pagingFnsFactory(collection, videoLinksSchema, { baseResourceName: 'majors' });

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({}),
  }),
});

const TYPES = {
  LOAD_INDEX: 'videos/LOAD_INDEX',
  CREATE: 'videos/CREATE',
  UPDATE: 'videos/UPDATE',
  DESTROY: 'videos/DESTROY',
  ADD_TO_PAGINATION: 'videos/ADD_TO_PAGINATION',
};

export const getPagingFns = prepareGetPagingFns(({ baseResourceName }) => {
  switch (baseResourceName) {
    case 'majors': return majorsPagingFns;
    default: return undefined;
  }
});

export function loadVideoLinks(page = 1, baseResourceName, baseResourceId) {
  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: `/${baseResourceName}/${baseResourceId}/video_links`,
      query: { page },
      urlParams: {
        page, collection, baseResourceName, baseResourceId,
      },
      responseSchema: [videoLinksSchema],
    },
  };
}

export function createVideoLink(values, baseResourceName, baseResourceId) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: `/${baseResourceName}/${baseResourceId}/video_links`,
        urlParams: { collection, baseResourceName, baseResourceId },
        body: values,
        responseSchema: videoLinksSchema,
      },
    }).then(({ value: { result } }) => {
      const pagingFns = getPagingFns({ baseResourceName });
      dispatch(pagingFns.actions.addToPagination(TYPES.ADD_TO_PAGINATION, result, baseResourceId));
    });
}

export function updateVideoLink(id, values, baseResourceName, baseResourceId) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: `/${baseResourceName}/${baseResourceId}/video_links/${id}`,
      urlParams: {
        id, collection, baseResourceName, baseResourceId,
      },
      body: values,
      responseSchema: videoLinksSchema,
    },
  };
}

export function destroyVideoLink(id, baseResourceName, baseResourceId) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: `/${baseResourceName}/${baseResourceId}/video_links/${id}`,
      urlParams: {
        id, collection, baseResourceName, baseResourceId,
      },
    },
  };
}

export default function videoLinksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`:
      return getPagingFns(payload).removeFromPage(state, payload.request.urlParams);
    case TYPES.ADD_TO_PAGINATION:
      return getPagingFns(payload).addToPage(state, payload);
    default:
      return state;
  }
}

export const getVideoLinkEntity = createSelector(
  getVideoLinkId,
  getEntities,
  (videoLinkId, entities) => denormalize(videoLinkId, videoLinksSchema, entities),
);
