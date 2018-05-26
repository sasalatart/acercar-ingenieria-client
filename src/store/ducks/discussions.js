import { Map } from 'immutable';
import { goToDiscussion } from './routes';
import { getEntityFactory } from './entities';
import pagingFnsFactory, {
  prepareGetPagingFns,
  removeFromAllPages,
  resetPaginationActionFactory,
} from './paginations';
import { discussionsSchema, discussionSummariesSchema } from '../../schemas';
import { suffixes, getSuffix } from '../../lib/discussions';
import { discussionsCollection as collection } from '../../lib/collections';

const commonArgs = [collection, discussionSummariesSchema];
const forumPagingFns = pagingFnsFactory(...commonArgs, { suffix: suffixes.forum });
const myPagingFns = pagingFnsFactory(...commonArgs, { suffix: suffixes.mine });

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
    mine: new Map({}),
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

export const getPagingFns = prepareGetPagingFns(({ suffix }) => (
  suffix === suffixes.mine ? myPagingFns : forumPagingFns
));

export function loadDiscussions(page = 1, mine, query) {
  return {
    type: mine ? TYPES.LOAD_MINE : TYPES.LOAD_INDEX,
    payload: {
      method: 'GET',
      url: `/discussions${mine ? '/mine' : ''}`,
      query: { page, ...query },
      fetchParams: {
        collection, page, ...query, suffix: getSuffix(mine),
      },
      responseSchema: [discussionSummariesSchema],
    },
  };
}

export function loadDiscussion(id) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: `/discussions/${id}`,
      fetchParams: { collection, id },
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
        fetchParams: { collection },
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
        fetchParams: { collection, id },
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
      fetchParams: { collection, id },
    },
  };
}

export const resetPagination = resetPaginationActionFactory(TYPES.RESET_PAGINATION);

export default function discussionsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_INDEX}_FULFILLED`:
    case `${TYPES.LOAD_MINE}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { fetchParams } = payload.request;
      return removeFromAllPages(state, [forumPagingFns, myPagingFns], fetchParams);
    }
    case TYPES.RESET_PAGINATION:
      return getPagingFns(payload).reset(state);
    default:
      return state;
  }
}

export const getDiscussionEntity = getEntityFactory(discussionsSchema);

export const getDiscussionSummaryEntity = getEntityFactory(discussionSummariesSchema);
