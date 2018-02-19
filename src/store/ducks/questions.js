import { Map } from 'immutable';
import URI from 'urijs';
import { questionsSchema } from '../../schemas';
import { majorPaging } from './paginations';

const majorsAnsweredPagingFns = majorPaging(state => state.questions, questionsSchema, ['answered'], ['answeredMeta']);

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({
      answered: new Map({}),
      answeredMeta: new Map({}),
    }),
  }),
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
    case `${TYPES.LOAD_ANSWERED_FROM_MAJOR}_FULFILLED`:
      return majorsAnsweredPagingFns.update(state, action.payload);
    default:
      return state;
  }
}

export const getQuestionsData = state => state.questions;

export const getAnsweredEntities = majorsAnsweredPagingFns.getPagedEntities;

export const getAnsweredPaginationMeta = majorsAnsweredPagingFns.getMeta;
