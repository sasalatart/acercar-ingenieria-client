import { combineReducers } from 'redux';
import { goToQuestions } from './routes';
import { getIsRequestingFactory } from './loading';
import { getEntityFactory } from './entities';
import { withFulfilledTypes } from './shared';
import paginationReducerFactory, { addToPaginationActionFactory, paginationDataSelectorFactory } from './shared/paginations';
import { crudActionsFactory } from './shared/crud';
import { questionsSchema } from '../../schemas';
import {
  suffixes,
  getSuffix,
  getPaginationKey,
  getLoadIndexType,
  getAddToPaginationType,
} from '../../lib/questions';
import collections from '../../lib/collections';

const TYPES = withFulfilledTypes({
  LOAD_PLATFORM_ANSWERED: 'questions/LOAD_PLATFORM_ANSWERED',
  LOAD_PLATFORM_UNANSWERED: 'questions/LOAD_PLATFORM_UNANSWERED',
  LOAD_MAJORS_ANSWERED: 'questions/LOAD_MAJORS_ANSWERED',
  LOAD_MAJORS_UNANSWERED: 'questions/LOAD_MAJORS_UNANSWERED',
  CREATE: 'questions/CREATE',
  UPDATE: 'questions/UPDATE',
  DESTROY: 'questions/DESTROY',
  ADD_TO_PLATFORM_ANSWERED: 'questions/ADD_TO_PLATFORM_ANSWERED',
  ADD_TO_PLATFORM_UNANSWERED: 'questions/ADD_TO_PLATFORM_UNANSWERED',
  ADD_TO_MAJORS_ANSWERED: 'questions/ADD_TO_MAJORS_ANSWERED',
  ADD_TO_MAJORS_UNANSWERED: 'questions/ADD_TO_MAJORS_UNANSWERED',
});

export default combineReducers({
  platformAnswered: paginationReducerFactory({
    setPage: TYPES.LOAD_PLATFORM_ANSWERED_FULFILLED,
    addToPage: TYPES.ADD_TO_PLATFORM_ANSWERED,
    removeFromPages: TYPES.DESTROY_FULFILLED,
  }),
  platformUnanswered: paginationReducerFactory({
    setPage: TYPES.LOAD_PLATFORM_UNANSWERED_FULFILLED,
    addToPage: TYPES.ADD_TO_PLATFORM_UNANSWERED,
    removeFromPages: TYPES.DESTROY_FULFILLED,
  }),
  majorsAnswered: paginationReducerFactory({
    setPage: TYPES.LOAD_MAJORS_ANSWERED_FULFILLED,
    addToPage: TYPES.ADD_TO_MAJORS_ANSWERED,
    removeFromPages: TYPES.DESTROY_FULFILLED,
  }),
  majorsUnanswered: paginationReducerFactory({
    setPage: TYPES.LOAD_MAJORS_UNANSWERED_FULFILLED,
    addToPage: TYPES.ADD_TO_MAJORS_UNANSWERED,
    removeFromPages: TYPES.DESTROY_FULFILLED,
  }),
});

export function loadQuestions({ query, baseId, suffix }) {
  const type = getLoadIndexType(TYPES, baseId, suffix);
  const urlOptions = {
    baseCollection: collections.majors,
    suffix: suffix === suffixes.unanswered ? suffix : undefined,
  };
  const { loadIndex } = crudActionsFactory({ LOAD_INDEX: type }, questionsSchema, urlOptions);
  return dispatch => dispatch(loadIndex({ baseId, query }));
}

const {
  create, update, destroy,
} = crudActionsFactory(TYPES, questionsSchema, { baseCollection: collections.majors });

export function createQuestion(body, baseId, shouldChangeRoute) {
  return (dispatch, getState) =>
    dispatch(create(body, baseId))
      .then((response) => {
        if (shouldChangeRoute) {
          dispatch(goToQuestions(baseId, body.answer ? undefined : suffixes.unanswered));
          return response;
        }

        const suffix = getSuffix(!body.answer);
        const type = getAddToPaginationType(TYPES, baseId, suffix);
        const addToPagination = addToPaginationActionFactory(type);
        // eslint-disable-next-line no-use-before-define
        const { paginationInfo } = getPaginationData(getState(), { baseId, suffix });
        dispatch(addToPagination(response.value.result, paginationInfo, { baseId }));
        return response;
      });
}

export function updateQuestion(id, body, baseId, shouldChangeRoute) {
  return dispatch =>
    dispatch(update(id, body))
      .then((response) => {
        if (shouldChangeRoute) {
          dispatch(goToQuestions(baseId, body.answer ? undefined : suffixes.unanswered));
        }
        return response;
      });
}

export const destroyQuestion = destroy;

export const getQuestionsState = state => state.questions;

export function getPaginationData(state, params) {
  return paginationDataSelectorFactory(
    getQuestionsState,
    getPaginationKey(params.baseId, params.suffix),
    questionsSchema,
  )(state, params);
}

export const getQuestionEntity = getEntityFactory(questionsSchema);

export function getIsLoadingQuestions(state, params) {
  const type = getLoadIndexType(TYPES, params.baseId, params.suffix);
  return getIsRequestingFactory(type)(state, params);
}

export const getIsDestroyingQuestion = getIsRequestingFactory(TYPES.DESTROY);
