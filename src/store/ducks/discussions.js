import { Map } from 'immutable';
import URI from 'urijs';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { goToDiscussion } from './routes';
import { getEntities } from './entities';
import pagingFnsFactory from './paginations';
import { discussionsSchema } from '../../schemas';

export const collection = 'discussions';
const commonArgs = [collection, discussionsSchema];
const forumPagingFns = pagingFnsFactory(...commonArgs, { suffix: 'forum' });
const myPagingFns = pagingFnsFactory(...commonArgs, { suffix: 'mine' });

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
  }),
});

const TYPES = {
  LOAD_INDEX: 'discussions/LOAD_INDEX',
  LOAD_MINE: 'discussions/LOAD_MINE',
  LOAD: 'discussions/LOAD',
  CREATE: 'discussions/CREATE',
  UPDATE: 'discussions/UPDATE',
  DESTROY: 'discussions/DESTROY',
  RESET_PAGINATION: 'discussions/RESET_PAGINATION',
};

export function getPagingFns(mine) {
  return mine ? myPagingFns : forumPagingFns;
}

export function loadDiscussions(page = 1, mine, query) {
  const urlSuffix = mine ? '/mine' : '';

  return {
    type: mine ? TYPES.LOAD_MINE : TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: URI(`/discussions${urlSuffix}`).query({ page, ...query }).toString(),
      urlParams: {
        collection, page, ...query, suffix: mine ? 'mine' : 'forum',
      },
      responseSchema: [discussionsSchema],
    },
  };
}

export function loadDiscussion(id) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/discussions/${id}`,
      urlParams: { collection, id },
      responseSchema: discussionsSchema,
    },
  };
}

export function createDiscussion(body) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: '/discussions',
        urlParams: { collection },
        body,
        responseSchema: discussionsSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(goToDiscussion(result));
    });
}

export function updateDiscussion(id, body) {
  return dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: `/discussions/${id}`,
        urlParams: { collection, id },
        body,
        responseSchema: discussionsSchema,
      },
    }).then(() => {
      dispatch(goToDiscussion(id));
    });
}

export function destroyDiscussion(id) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: `/discussions/${id}`,
      urlParams: { collection, id },
    },
  };
}

export function resetPagination(mine) {
  return {
    type: TYPES.RESET_PAGINATION,
    payload: { mine },
  };
}

export default function discussionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return forumPagingFns.reducer.setPage(state, action.payload);
    case `${TYPES.LOAD_MINE}_FULFILLED`:
      return myPagingFns.reducer.setPage(state, action.payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromForum = forumPagingFns.reducer.removeFromPage(state, urlParams);
      return myPagingFns.reducer.removeFromPage(fromForum, urlParams);
    }
    case TYPES.RESET_PAGINATION: {
      const { mine } = action.payload;
      return getPagingFns(mine).reducer.reset(state);
    }
    default:
      return state;
  }
}

const getId = (state, params) => params.id;

export const getDiscussionEntity = createSelector(
  getId,
  getEntities,
  (discussionId, entities) => denormalize(discussionId, discussionsSchema, entities),
);
