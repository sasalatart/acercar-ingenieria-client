import { Map } from 'immutable';
import URI from 'urijs';
import { articlesSchema } from '../../schemas';
import { majorPaging } from './paginations';

const majorsPagingFns = majorPaging(state => state.articles, articlesSchema);

const INITIAL_STATE = new Map({
  pagination: new Map({
    majors: new Map({}),
    majorsMeta: new Map({}),
  }),
});

const TYPES = {
  LOAD: 'fetch::questions/LOAD',
};

export function loadArticles(page = 1, majorId) {
  const uri = majorId
    ? URI(`/majors/${majorId}/articles`)
    : URI('/articles');

  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: uri.query({ page }).toString(),
      urlParams: { page, majorId },
      responseSchema: [articlesSchema],
    },
  };
}

export function getPagingFns(isOfMajor) {
  return isOfMajor ? majorsPagingFns : undefined;
}

export default function articlesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return getPagingFns(action.payload.request.urlParams.majorId).update(state, action.payload);
    default:
      return state;
  }
}
