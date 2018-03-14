import { Map, Set } from 'immutable';
import URI from 'urijs';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { goToDiscussion } from './routes';
import {
  removeEntity,
  getEntities,
} from './entities';
import { pagingFnsFactory } from './paginations';
import { resourceSuccessNotification } from './notifications';
import { discussionsSchema } from '../../schemas';

const forumPagingFns = pagingFnsFactory('discussions', discussionsSchema, 'forum');
const myPagingFns = pagingFnsFactory('discussions', discussionsSchema, 'mine');

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
  }),
  destroyingIds: new Set([]),
});

const TYPES = {
  LOAD_INDEX: 'fetch::discussions/LOAD_INDEX',
  LOAD_MINE: 'fetch::discussions/LOAD_MINE',
  LOAD: 'fetch::discussions/LOAD',
  CREATE: 'fetch::discussions/CREATE',
  UPDATE: 'fetch::discussions/UPDATE',
  DESTROY: 'fetch::discussions/DESTROY',
};

export function getPagingFns(mine) {
  return mine ? myPagingFns : forumPagingFns;
}

export function loadDiscussions(page = 1, mine) {
  const urlSuffix = mine ? '/mine' : '';

  return {
    type: mine ? TYPES.LOAD_MINE : TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: URI(`/discussions${urlSuffix}`).query({ page }).toString(),
      urlParams: { page },
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
      urlParams: { id },
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
        body,
        responseSchema: discussionsSchema,
      },
    }).then(({ value: { result } }) => {
      dispatch(resourceSuccessNotification('discussion', 'created'));
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
        urlParams: { id },
        body,
        responseSchema: discussionsSchema,
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('discussion', 'updated'));
      dispatch(goToDiscussion(id));
    });
}

export function destroyDiscussion(id) {
  return (dispatch) => {
    dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/discussions/${id}`,
        urlParams: { id },
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('discussion', 'destroyed'));
      dispatch(removeEntity('discussions', id));
    });
  };
}

export default function discussionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
      return forumPagingFns.update(state, action.payload);
    case `${TYPES.LOAD_MINE}_FULFILLED`:
      return myPagingFns.update(state, action.payload);
    case TYPES.DESTROY:
      return state.update('destroyingIds', ids => ids.add(action.payload.urlParams.id));
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const fromForum = forumPagingFns.destroy(state, urlParams);
      const fromMine = myPagingFns.destroy(fromForum, urlParams);
      return fromMine.update('destroyingIds', ids => ids.delete(urlParams.id));
    }
    default:
      return state;
  }
}

const getDiscussionsData = state => state.discussions;

const getDiscussionId = (state, params) => params.discussionId;

export const getDiscussionEntity = createSelector(
  getDiscussionId,
  getEntities,
  (discussionId, entities) => denormalize(discussionId, discussionsSchema, entities),
);

export const getDestroyingIds = createSelector(
  getDiscussionsData,
  discussionsData => discussionsData.get('destroyingIds'),
);
