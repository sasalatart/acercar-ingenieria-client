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

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({
      answered: new Map({}),
      answeredMeta: new Map({}),
    }),
  }),
  destroyingIds: new Set(),
});

const TYPES = {
  LOAD_ANSWERED_FROM_MAJOR: 'fetch::questions/LOAD_ANSWERED_FROM_MAJOR',
  CREATE: 'fetch::questions/CREATE',
  UPDATE: 'fetch::questions/UPDATE',
  DESTROY: 'fetch::questions/DESTROY',
  SET_DESTROYING: 'questions/SET_DESTROYING',
};

export function loadAnsweredMajorQuestions(page = 1, majorId) {
  return {
    type: TYPES.LOAD_ANSWERED_FROM_MAJOR,
    payload: {
      method: 'GET',
      url: URI(`/majors/${majorId}/questions`).query({ page }).toString(),
      urlParams: { majorId, page },
      responseSchema: [questionsSchema],
    },
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

export function destroyQuestion(id, majorId, page) {
  return (dispatch) => {
    dispatch(setDestroyingQuestion(id));
    return dispatch({
      type: TYPES.DESTROY,
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
}

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_ANSWERED_FROM_MAJOR}_FULFILLED`:
      return majorsAnsweredPagingFns.update(state, action.payload);
    case `${TYPES.DESTROY}_FULFILLED`:
      return majorsAnsweredPagingFns
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

export const getAnsweredEntities = majorsAnsweredPagingFns.getPagedEntities;

export const getAnsweredPaginationMeta = majorsAnsweredPagingFns.getMeta;

export const getDestroyingIds = createSelector(
  getQuestionsData,
  questionsData => questionsData.get('destroyingIds'),
);
