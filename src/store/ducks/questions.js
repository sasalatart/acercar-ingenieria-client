import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { questionsSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory from './paginations';

export const collection = 'questions';
const commonArgs = [collection, questionsSchema];
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
});

const TYPES = {
  LOAD_ANSWERED: 'questions/LOAD_ANSWERED',
  LOAD_UNANSWERED: 'questions/LOAD_UNANSWERED',
  CREATE: 'questions/CREATE',
  UPDATE: 'questions/UPDATE',
  DESTROY: 'questions/DESTROY',
  ADD_TO_ANSWERED_PAGINATION: 'questions/ADD_TO_ANSWERED_PAGINATION',
  ADD_TO_UNANSWERED_PAGINATION: 'questions/ADD_TO_UNANSWERED_PAGINATION',
};

export function getCollectionParams(majorId) {
  return {
    collection,
    baseResourceName: majorId && 'majors',
    baseResourceId: majorId,
  };
}

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

  const suffix = pending ? 'pending' : 'answered';

  return {
    type: pending ? TYPES.LOAD_UNANSWERED : TYPES.LOAD_ANSWERED,
    payload: {
      method: 'GET',
      url: uri.query({ page }).toString(),
      urlParams: { page, ...getCollectionParams(majorId), suffix },
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
        urlParams: getCollectionParams(majorId),
        body: values,
        responseSchema: questionsSchema,
      },
    }).then(({ value: { result } }) => {
      const type = values.answer
        ? TYPES.ADD_TO_ANSWERED_PAGINATION
        : TYPES.ADD_TO_UNANSWERED_PAGINATION;

      const pagingFns = getPagingFns(!values.answer, majorId);
      dispatch(pagingFns.actions.addToPage(type, result, 1, majorId));
    });
}

export function updateQuestion(id, values, majorId) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
      urlParams: { id, ...getCollectionParams(majorId) },
      body: values,
      responseSchema: questionsSchema,
    },
  };
}

export function destroyQuestion(id, majorId) {
  return {
    type: TYPES.DESTROY,
    payload: {
      method: 'DELETE',
      url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
      urlParams: { id, ...getCollectionParams(majorId) },
    },
  };
}

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_ANSWERED}_FULFILLED`: {
      const { baseResourceId } = action.payload.request.urlParams;
      return getPagingFns(false, baseResourceId).reducer.setPage(state, action.payload);
    }
    case `${TYPES.LOAD_UNANSWERED}_FULFILLED`: {
      const { baseResourceId } = action.payload.request.urlParams;
      return getPagingFns(true, baseResourceId).reducer.setPage(state, action.payload);
    }
    case `${TYPES.UPDATE}_FULFILLED`: {
      const { urlParams, body } = action.payload.request;
      const pagingFns = getPagingFns(!!body.answer, urlParams.baseResourceId);
      return pagingFns.reducer.removeFromPage(state, urlParams);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = action.payload.request;
      const pendingPagingFns = getPagingFns(true, urlParams.baseResourceId);
      const answeredPagingFns = getPagingFns(false, urlParams.baseResourceId);

      const fromPending = pendingPagingFns.reducer.removeFromPage(state, urlParams);
      return answeredPagingFns.reducer.removeFromPage(fromPending, urlParams);
    }
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
