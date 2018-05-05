import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import keyMirror from 'keymirror';
import { questionsSchema } from '../../schemas';
import { getEntities } from './entities';
import pagingFnsFactory, { prepareGetPagingFns, removeFromAllPages } from './paginations';
import { getQuestionId } from './shared';

export const collection = 'questions';
export const suffixes = keyMirror({ answered: null, pending: null });

const commonArgs = [collection, questionsSchema];
const answeredSuffix = { suffix: suffixes.answered };
const pendingSuffix = { suffix: suffixes.pending };

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

export function getCollectionParams(baseResourceId) {
  return {
    collection,
    baseResourceName: baseResourceId && 'majors',
    baseResourceId,
  };
}

export function getSuffix(pending) {
  return pending ? suffixes.pending : suffixes.answered;
}

export const getPagingFns = prepareGetPagingFns(({ baseResourceId, suffix }) => {
  if (baseResourceId) {
    return suffix === suffixes.pending ? majorsPendingPagingFns : majorsAnsweredPagingFns;
  }

  return suffix === suffixes.pending ? platformPendingPagingFns : platformAnsweredPagingFns;
});

export function loadQuestions(page = 1, baseResourceId, pending) {
  const urlSuffix = pending ? '/pending' : '';

  return {
    type: pending ? TYPES.LOAD_UNANSWERED : TYPES.LOAD_ANSWERED,
    payload: {
      method: 'GET',
      url: baseResourceId ? `/majors/${baseResourceId}/questions${urlSuffix}` : `/questions${urlSuffix}`,
      query: { page },
      urlParams: { page, ...getCollectionParams(baseResourceId), suffix: getSuffix(pending) },
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
        urlParams: getCollectionParams(majorId),
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

export default function questionsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${TYPES.LOAD_ANSWERED}_FULFILLED`:
    case `${TYPES.LOAD_UNANSWERED}_FULFILLED`:
      return getPagingFns(payload).setPage(state, payload);
    case `${TYPES.UPDATE}_FULFILLED`: {
      const { urlParams, body } = payload.request;
      const pagingFns = getPagingFns({ ...urlParams, suffix: getSuffix(!!body.answer) });
      return pagingFns.removeFromPage(state, urlParams);
    }
    case `${TYPES.DESTROY}_FULFILLED`: {
      const { urlParams } = payload.request;
      const pendingPagingFns = getPagingFns({ ...payload, ...pendingSuffix });
      const answeredPagingFns = getPagingFns({ ...payload, ...answeredSuffix });
      return removeFromAllPages(state, [pendingPagingFns, answeredPagingFns], urlParams);
    }
    case TYPES.ADD_TO_ANSWERED_PAGINATION:
      return getPagingFns({ ...payload, ...answeredSuffix }).addToPage(state, payload);
    case TYPES.ADD_TO_UNANSWERED_PAGINATION:
      return getPagingFns({ ...payload, ...pendingSuffix }).addToPage(state, payload);
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
