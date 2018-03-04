import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { questionsSchema } from '../../schemas';
import {
  addQueryToCurrentUri,
  getPage,
} from './routes';
import { getEntities, removeEntity } from './entities';
import {
  pagingFnsFactory,
  nestedPagingFnsFactory,
} from './paginations';
import {
  questionCreatedNotification,
  questionUpdatedNotification,
  questionDestroyedNotification,
} from './notifications';

const commonMajorParams = ['questions', questionsSchema, 'majors'];
const majorsAnsweredPagingFns = nestedPagingFnsFactory(...commonMajorParams, 'answered');
const majorsPendingPagingFns = nestedPagingFnsFactory(...commonMajorParams, 'pending');

const commonPlatformParams = ['questions', questionsSchema];
const platformAnsweredPagingFns = pagingFnsFactory(...commonPlatformParams, 'answered');
const platformPendingPagingFns = pagingFnsFactory(...commonPlatformParams, 'pending');

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({}),
    platform: new Map({}),
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
  ADD_TO_PAGINATION: 'questions/ADD_TO_PAGINATION',
};

export function loadQuestions(page = 1, majorId, pending) {
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
}

function addQuestionToPagination(id, majorId, pending, page = 1) {
  return (dispatch, getState) => {
    const currentPage = getPage(getState());

    if (currentPage && currentPage !== page) {
      dispatch(addQueryToCurrentUri({ page }));
    }

    return dispatch({
      type: TYPES.ADD_TO_PAGINATION,
      payload: {
        id, majorId, pending, page,
      },
    });
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
    }).then(({ value: { result } }) => {
      dispatch(questionCreatedNotification());
      dispatch(addQuestionToPagination(result, majorId, !values.answer));
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

export function destroyQuestion(id, majorId, pending) {
  return (dispatch) => {
    dispatch(setDestroyingQuestion(id));
    return dispatch({
      type: pending ? TYPES.DESTROY_UNANSWERED : TYPES.DESTROY_ANSWERED,
      payload: {
        method: 'DELETE',
        url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
        urlParams: { id, majorId },
      },
    }).then(() => {
      dispatch(questionDestroyedNotification());
      dispatch(removeEntity('questions', id));
    });
  };
}

export function getPagingFns(isUnanswered, isOfMajor) {
  if (isOfMajor) {
    return isUnanswered ? majorsPendingPagingFns : majorsAnsweredPagingFns;
  }

  return isUnanswered ? platformPendingPagingFns : platformAnsweredPagingFns;
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
    case TYPES.ADD_TO_PAGINATION: {
      const {
        id, majorId, pending, page,
      } = action.payload;
      return getPagingFns(pending, majorId).addToPagination(state, id, page, majorId);
    }
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
