import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { questionsSchema } from '../../schemas';
import { getEntities, removeEntity } from './entities';
import { majorPaging } from './paginations';
import {
  questionCreatedNotification,
  questionUpdatedNotification,
  questionDestroyedNotification,
} from './notifications';

const majorsAnsweredPagingFns = majorPaging(state => state.questions, questionsSchema, ['answered'], ['answeredMeta']);
const majorsPendingPagingFns = majorPaging(state => state.questions, questionsSchema, ['pending'], ['pendingMeta']);

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({
      answered: new Map({}),
      answeredMeta: new Map({}),
      pending: new Map({}),
      pendingMeta: new Map({}),
    }),
  }),
  destroyingIds: new Set(),
});

const TYPES = {
  LOAD_ANSWERED: 'fetch::questions/LOAD_ANSWERED',
  LOAD_UNANSWERED: 'fetch::questions/LOAD_UNANSWERED',
  CREATE: 'fetch::questions/CREATE',
  UPDATE: 'fetch::questions/UPDATE',
  DESTROY_ANSWERED: 'fetch::questions/DESTROY_ANSWERED',
  DESTROY_UNANSWERED: 'fetch::questions/DESTROY_UNANSWERED',
  SET_DESTROYING: 'questions/SET_DESTROYING',
};

export function loadQuestionsFactory(pending) {
  return function loadQuestions(page = 1, majorId) {
    const urlSuffix = pending ? '/pending' : '';
    const uri = majorId
      ? URI(`/majors/${majorId}/questions${urlSuffix}`)
      : URI(`/questions${urlSuffix}`);

    return {
      type: pending ? TYPES.LOAD_UNANSWERED : TYPES.LOAD_ANSWERED,
      payload: {
        method: 'GET',
        url: uri.query({ page }).toString(),
        urlParams: { page, majorId },
        responseSchema: [questionsSchema],
      },
    };
  };
}

export function createQuestion(values, majorId) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: majorId ? `/majors/${majorId}/questions` : '/questions',
        urlParams: { majorId },
        body: values,
        responseSchema: questionsSchema,
      },
    }).then(() => {
      dispatch(questionCreatedNotification());
    });
}

export function updateQuestion(values, majorId, id) {
  return dispatch =>
    dispatch({
      type: TYPES.UPDATE,
      payload: {
        method: 'PUT',
        url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
        urlParams: { id, majorId },
        body: values,
        responseSchema: questionsSchema,
      },
    }).then(() => {
      dispatch(questionUpdatedNotification());
    });
}

function setDestroyingQuestion(id) {
  return {
    type: TYPES.SET_DESTROYING,
    payload: { id },
  };
}

export function destroyQuestionFactory(pending) {
  return function destroyQuestion(id, majorId, page) {
    return (dispatch) => {
      dispatch(setDestroyingQuestion(id));
      return dispatch({
        type: pending ? TYPES.DESTROY_UNANSWERED : TYPES.DESTROY_ANSWERED,
        payload: {
          method: 'DELETE',
          url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
          urlParams: { id, majorId, page },
        },
      }).then(() => {
        dispatch(questionDestroyedNotification());
        dispatch(removeEntity('questions', id));
      });
    };
  };
}

export function getPagingFns(isUnanswered, isOfMajor) {
  if (isUnanswered && isOfMajor) {
    return majorsPendingPagingFns;
  } else if (isOfMajor) {
    return majorsAnsweredPagingFns;
  }

  return undefined;
}

function getPagingFnsFromAction(type, payload) {
  const isUnanswered = type.includes('UNANSWERED');
  const isOfMajor = payload.request.urlParams.majorId;
  return getPagingFns(isUnanswered, isOfMajor);
}

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_ANSWERED}_FULFILLED`:
    case `${TYPES.LOAD_UNANSWERED}_FULFILLED`:
      return getPagingFnsFromAction(action.type, action.payload).update(state, action.payload);
    case `${TYPES.DESTROY_ANSWERED}_FULFILLED`:
    case `${TYPES.DESTROY_UNANSWERED}_FULFILLED`:
      return getPagingFnsFromAction(action.type, action.payload)
        .destroy(state, action.payload.request.urlParams)
        .update('destroyingIds', ids => ids.delete(action.payload.request.urlParams.id));
    case TYPES.SET_DESTROYING:
      return state.update('destroyingIds', ids => ids.add(action.payload.id));
    default:
      return state;
  }
}

export const getQuestionsData = state => state.questions;

const getQuestionId = (state, params) => params.questionId;

export const getQuestionEntity = createSelector(
  getQuestionId,
  getEntities,
  (questionId, entities) => denormalize(questionId, questionsSchema, entities),
);

export const getDestroyingIds = createSelector(
  getQuestionsData,
  questionsData => questionsData.get('destroyingIds'),
);
