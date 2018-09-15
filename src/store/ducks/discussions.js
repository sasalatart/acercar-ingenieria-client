import { combineReducers } from 'redux';
import upperFirst from 'lodash/upperFirst';
import { goToDiscussion } from './routes';
import { getIsRequestingFactory } from './loading';
import { getEntityFactory } from './entities';
import { fulfilledType } from './shared';
import paginationReducerFactory, { paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { discussionsSchema, discussionSummariesSchema } from '../../schemas';
import { suffixes, getLoadIndexType } from '../../lib/discussions';
import collections from '../../lib/collections';

const TYPES = {
  LOAD_PLATFORM_INDEX: 'discussions/LOAD_PLATFORM_INDEX',
  LOAD_PLATFORM_MINE: 'discussions/LOAD_PLATFORM_MINE',
  LOAD: 'discussions/LOAD',
  CREATE: 'discussions/CREATE',
  UPDATE: 'discussions/UPDATE',
  DESTROY: 'discussions/DESTROY',
  RESET_PAGINATION: 'discussions/RESET_PAGINATION',
};

function reducerFactory(setType) {
  return paginationReducerFactory({
    setPage: fulfilledType(setType),
    removeFromPages: fulfilledType(TYPES.DESTROY),
    resetPagination: TYPES.RESET_PAGINATION,
  });
}

export default combineReducers({
  platformIndex: reducerFactory(TYPES.LOAD_PLATFORM_INDEX),
  platformMine: reducerFactory(TYPES.LOAD_PLATFORM_MINE),
});

export function loadDiscussions({ query, suffix }) {
  const types = { LOAD_INDEX: getLoadIndexType(TYPES, suffix) };
  const urlOptions = {
    collection: collections.discussions,
    suffix: suffix === suffixes.mine ? suffix : undefined,
  };
  const { loadIndex } = crudActionsFactory(types, discussionSummariesSchema, urlOptions);
  return dispatch => dispatch(loadIndex({ query }));
}

const {
  load, create, update, destroy,
} = crudActionsFactory(TYPES, discussionsSchema);

export const loadDiscussion = load;

export const createDiscussion = (body, baseId) =>
  dispatch => dispatch(create(body, baseId))
    .then(({ value: { result } }) => dispatch(goToDiscussion(result)));

export const updateDiscussion = (id, body) =>
  dispatch => dispatch(update(id, body))
    .then(() => dispatch(goToDiscussion(id)));

export const destroyDiscussion = destroy;

export const resetPagination = () => ({ type: TYPES.RESET_PAGINATION });

const getDiscussionsState = state => state.discussions;

export function getPaginationData(state, props) {
  return paginationDataSelectorFactory(
    getDiscussionsState,
    `platform${upperFirst(props.suffix)}`,
    discussionSummariesSchema,
  )(state, props);
}

export const getDiscussionEntity = getEntityFactory(discussionsSchema);
export const getDiscussionSummaryEntity = getEntityFactory(discussionSummariesSchema);

export function getIsLoadingDiscussions(state, params) {
  const type = getLoadIndexType(TYPES, params.suffix);
  return getIsRequestingFactory(type)(state, params);
}

export const getIsLoadingDiscussion = getIsRequestingFactory(TYPES.LOAD);
export const getIsDestroyingDiscussion = getIsRequestingFactory(TYPES.DESTROY);
