import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import URI from 'urijs';
import { getEntities } from './entities';
import { questionsSchema } from '../../schemas';

const INITIAL_STATE = new Map({
  answeredMajorQuestionsPagination: new Map({}),
  answeredMajorQuestionsPaginationMeta: new Map({}),
});

const TYPES = {
  LOAD_ANSWERED_FROM_MAJOR: 'fetch::questions/LOAD_ANSWERED_FROM_MAJOR',
};

export function loadAnsweredMajorQuestions(majorId, page = 1) {
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

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD_ANSWERED_FROM_MAJOR}_FULFILLED`: {
      const { pagination, result, request: { urlParams: { majorId } } } = action.payload;
      return state
        .mergeIn(['answeredMajorQuestionsPagination', majorId], new Map({ [pagination.page]: result }))
        .setIn(['answeredMajorQuestionsPaginationMeta', majorId], pagination);
    }
    default:
      return state;
  }
}

export const getQuestionsData = state => state.questions;

export const getMajorId = (state, params) => params.majorId;

export const getPage = (state, params) => params.page;

export const getPagedAnsweredMajorQuestionIds = createSelector(
  getMajorId,
  getPage,
  getQuestionsData,
  (majorId, page, questionsData) =>
    questionsData.getIn(['answeredMajorQuestionsPagination', majorId, String(page)]),
);

export const getPagedAnsweredMajorQuestionEntities = createSelector(
  getPagedAnsweredMajorQuestionIds,
  getEntities,
  (questionIds, entities) =>
    denormalize(questionIds, [questionsSchema], entities),
);

export const getAnsweredMajorQuestionsPaginationMeta = createSelector(
  getMajorId,
  getQuestionsData,
  (majorId, questionsData) => questionsData.getIn(['answeredMajorQuestionsPaginationMeta', majorId]),
);
