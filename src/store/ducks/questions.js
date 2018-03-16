import { Map, Set } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { questionsSchema } from '../../schemas';
import {
  getEntities,
  removeEntity,
} from './entities';
import pagingFnsFactory from './paginations';
import { resourceSuccessNotification } from './notifications';

const commonArgs = ['questions', questionsSchema];
const answeredSuffix = { suffix: 'answered' };
const pendingSuffix = { suffix: 'pending' };

const majorsAnsweredPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors', ...answeredSuffix });
const majorsPendingPagingFns = pagingFnsFactory(...commonArgs, { baseResourceName: 'majors', ...pendingSuffix });

const platformAnsweredPagingFns = pagingFnsFactory(...commonArgs, answeredSuffix);
const platformPendingPagingFns = pagingFnsFactory(...commonArgs, pendingSuffix);

const INITIAL_STATE = new Map({
  pagination: new Map({
    platform: new Map({}),
    majors: new Map({}),
  }),
  destroyingIds: new Set(),
});

const TYPES = {
  LOAD_ANSWERED: 'fetch::questions/LOAD_ANSWERED',
  LOAD_UNANSWERED: 'fetch::questions/LOAD_UNANSWERED',
  CREATE: 'fetch::questions/CREATE',
  UPDATE: 'fetch::questions/UPDATE',
  DESTROY: 'fetch::questions/DESTROY',
  SET_DESTROYING: 'questions/SET_DESTROYING',
  ADD_TO_ANSWERED_PAGINATION: 'questions/ADD_TO_ANSWERED_PAGINATION',
  ADD_TO_UNANSWERED_PAGINATION: 'questions/ADD_TO_UNANSWERED_PAGINATION',
};

export function getPagingFns(isUnanswered, isOfMajor) {
  if (isOfMajor) {
    return isUnanswered ? majorsPendingPagingFns : majorsAnsweredPagingFns;
  }

  return isUnanswered ? platformPendingPagingFns : platformAnsweredPagingFns;
}

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
      dispatch(resourceSuccessNotification('question', 'created'));
      const type = values.answer
        ? TYPES.ADD_TO_ANSWERED_PAGINATION
        : TYPES.ADD_TO_UNANSWERED_PAGINATION;

      const pagingFns = getPagingFns(!values.answer, majorId);
      dispatch(pagingFns.actions.addToPage(type, result, 1, majorId));
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
      dispatch(resourceSuccessNotification('question', 'updated'));
    });
}

function setDestroyingQuestion(id) {
  return {
    type: TYPES.SET_DESTROYING,
    payload: { id },
  };
}

export function destroyQuestion(id, majorId) {
  return (dispatch) => {
    dispatch(setDestroyingQuestion(id));
    return dispatch({
      type: TYPES.DESTROY,
      payload: {
        method: 'DELETE',
        url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
        urlParams: { id, majorId },
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('question', 'destroyed'));
      dispatch(removeEntity('questions', id));
    });
  };
}

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_ANSWERED}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(false, majorId).reducer.setPage(state, action.payload);
    }
    case `${TYPES.LOAD_UNANSWERED}_FULFILLED`: {
      const { majorId } = action.payload.request.urlParams;
      return getPagingFns(true, majorId).reducer.setPage(state, action.payload);
    }
    case `${TYPES.UPDATE}_FULFILLED`: {
      const { urlParams, body } = action.payload.request;
      const pagingFns = getPagingFns(!!body.answer, urlParams.majorId);
      return pagingFns.reducer.removeFromPage(state, urlParams);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const pendingPagingFns = getPagingFns(true, urlParams.majorId);
      const answeredPagingFns = getPagingFns(false, urlParams.majorId);

      const fromPending = pendingPagingFns.reducer.removeFromPage(state, urlParams);
      const fromAnswered = answeredPagingFns.reducer.removeFromPage(fromPending, urlParams);
      return fromAnswered.update('destroyingIds', ids => ids.delete(urlParams.id));
    }
    case TYPES.SET_DESTROYING:
      return state.update('destroyingIds', ids => ids.add(action.payload.id));
    case TYPES.ADD_TO_ANSWERED_PAGINATION: {
      const { id, baseResourceId } = action.payload;
      return getPagingFns(false, baseResourceId).reducer.addToPage(state, id, 1, baseResourceId);
    }
    case TYPES.ADD_TO_UNANSWERED_PAGINATION: {
      const { id, baseResourceId } = action.payload;
      return getPagingFns(true, baseResourceId).reducer.addToPage(state, id, 1, baseResourceId);
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
