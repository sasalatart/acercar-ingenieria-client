import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import {
  removeEntity,
  getEntities,
} from './entities';
import { usersSchema } from '../../schemas';
import pagingFnsFactory from './paginations';
import { resourceSuccessNotification } from './notifications';

const commonArgs = ['users', usersSchema];
const platformPagingFns = pagingFnsFactory(...commonArgs);
const majorsPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors' });

const INITIAL_STATE = Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
  destroyingIds: new Set([]),
});

export const TYPES = {
  LOAD: 'fetch::users/LOAD',
  LOAD_INDEX: 'fetch::users/LOAD_INDEX',
  DESTROY: 'fetch::users/DESTROY',
};

export function getPagingFns(majorId) {
  return majorId ? majorsPagingFns : platformPagingFns;
}

export function loadUsers(page, majorId) {
  const baseUrl = majorId ? `/majors/${majorId}/users` : '/users';

  return {
    type: TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: URI(baseUrl).query({ page }).toString(),
      urlParams: { majorId, page },
      responseSchema: [usersSchema],
    },
  };
}

export function loadUser(id) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/users/${id}`,
      urlParams: { id },
      responseSchema: usersSchema,
    },
  };
}

export function destroyUser(id) {
  return dispatch =>
    dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/users/${id}`,
        urlParams: { id },
      },
    }).then(() => {
      dispatch(removeEntity('users', id));
      dispatch(resourceSuccessNotification('user', 'destroyed'));
    });
}

export default function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(majorId).reducer.setPage(state, action.payload);
    }
    case TYPES.DESTROY: {
      const { id } = action.payload.urlParams;
      return state.update('destroyingIds', ids => ids.add(id));
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromMajors = majorsPagingFns.reducer.removeFromPage(state, urlParams);
      const fromPlatform = platformPagingFns.reducer.removeFromPage(fromMajors, urlParams);
      return fromPlatform.update('destroyingIds', ids => ids.delete(urlParams.id));
    }
    default:
      return state;
  }
}

export const getUsersData = state => state.users;

const getUserId = (state, params) => params.userId;

export const getUserEntity = createSelector(
  getUserId,
  getEntities,
  (userId, entities) => denormalize(userId, usersSchema, entities),
);

export const getDestroyingIds = createSelector(
  getUsersData,
  usersData => usersData.get('destroyingIds'),
);
