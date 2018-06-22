import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { questionsSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory, { prepareGetPagingFns, removeFromAllPages } from './paginations';
import { getQuestionId } from './shared';
import { suffixes, getSuffix, getCollectionParams } from '../../lib/questions';
import collections from '../../lib/collections';

const collection = collections.questions;

function createPagingFns(suffix, baseResourceName) {
  return pagingFnsFactory(collection, questionsSchema, { suffix, baseResourceName });
}

const majorsPagingFns = {
  [suffixes.pending]: createPagingFns(suffixes.pending, collections.majors),
  [suffixes.answered]: createPagingFns(suffixes.answered, collections.majors),
};

const platformPagingFns = {
  [suffixes.pending]: createPagingFns(suffixes.pending),
  [suffixes.answered]: createPagingFns(suffixes.answered),
};

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

export const getPagingFns = prepareGetPagingFns(({ baseResourceId, suffix }) => (
  baseResourceId ? majorsPagingFns[suffix] : platformPagingFns[suffix]
));

export function loadQuestions(page = 1, baseResourceId, pending) {
  const urlSuffix = pending ? '/pending' : '';

  return {
    type: pending ? TYPES.LOAD_UNANSWERED : TYPES.LOAD_ANSWERED,
    payload: {
      method: 'GET',
      url: baseResourceId ? `/majors/${baseResourceId}/questions${urlSuffix}` : `/questions${urlSuffix}`,
      query: { page },
      fetchParams: { page, ...getCollectionParams(baseResourceId, { suffix: getSuffix(pending) }) },
      responseSchema: [questionsSchema],
    },
  };
}

export function createQuestion(values, majorId, shouldAddToPagination) {
  return dispatch =>
    dispatch({
      type: TYPES.CREATE,
      payload: {
        method: 'POST',
        url: majorId ? `/majors/${majorId}/questions` : '/questions',
        fetchParams: getCollectionParams(majorId),
        body: values,
        responseSchema: questionsSchema,
      },
    }).then(({ value: { result } }) => {
      if (!shouldAddToPagination) return;

      const type = values.answer
        ? TYPES.ADD_TO_ANSWERED_PAGINATION
        : TYPES.ADD_TO_UNANSWERED_PAGINATION;

      const params = { baseResourceId: majorId, suffix: getSuffix(!values.answer) };
      const pagingFns = getPagingFns(params, true);
      dispatch(pagingFns.actions.addToPagination(type, result, majorId));
    });
}

export function updateQuestion(id, values, majorId) {
  return {
    type: TYPES.UPDATE,
    payload: {
      method: 'PUT',
      url: majorId ? `/majors/${majorId}/questions/${id}` : `/questions/${id}`,
      fetchParams: getCollectionParams(majorId, { id }),
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
      fetchParams: getCollectionParams(majorId, { id }),
    },
  };
}

export default function questionsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_ANSWERED}_FULFILLED`:
    case `${TYPES.LOAD_UNANSWERED}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.UPDATE}_FULFILLED`: {
      const { fetchParams, body } = payload.request;
      const pagingFns = getPagingFns({ ...fetchParams, suffix: getSuffix(!!body.answer) });
      return pagingFns.removeFromPage(state, fetchParams);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { fetchParams } = payload.request;
      const pendingPagingFns = getPagingFns({ ...payload, ...{ suffix: suffixes.pending } });
      const answeredPagingFns = getPagingFns({ ...payload, ...{ suffix: suffixes.answered } });
      return removeFromAllPages(state, [pendingPagingFns, answeredPagingFns], fetchParams);
    }
    case TYPES.ADD_TO_ANSWERED_PAGINATION:
      return getPagingFns({ ...payload, ...{ suffix: suffixes.answered } })
        .addToPage(state, payload);
    case TYPES.ADD_TO_UNANSWERED_PAGINATION:
      return getPagingFns({ ...payload, ...{ suffix: suffixes.pending } })
        .addToPage(state, payload);
    default:
      return state;
  }
}

export const getQuestionsData = state => state.questions;

export const getQuestionEntity = createSelector(
  getQuestionId,
  getEntities,
  (questionId, entities) => denormalize(questionId, questionsSchema, entities),
);
