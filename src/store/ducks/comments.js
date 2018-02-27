import { Map } from 'immutable';
import URI from 'urijs';
import { nestedPagingFnsFactory } from './paginations';
import { commentsSchema } from '../../schemas';

const majorsPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'majors');
const articlesPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'articles');
const discussionsPagingFns = nestedPagingFnsFactory('comments', commentsSchema, 'discussions');

const INITIAL_STATE = new Map({
  pagination: new Map({
    articles: new Map({}),
    articlesMeta: new Map({}),
  }),
});

const TYPES = {
  LOAD: 'fetch::comments/LOAD',
};

function getBaseResourceName(params) {
  if (params.majorId) return 'majors';
  if (params.articleId) return 'articles';
  if (params.discussionId) return 'discussions';

  return undefined;
}

export function getPagingFns(params) {
  const resourceName = getBaseResourceName(params);

  switch (resourceName) {
    case 'majors': return majorsPagingFns;
    case 'articles': return articlesPagingFns;
    case 'discussions': return discussionsPagingFns;
    default: return undefined;
  }
}

export function loadComments(baseResourceName, baseResourceId, page = 1) {
  return {
    type: TYPES.LOAD,
    payload: {
      method: 'GET',
      url: URI(`/${baseResourceName}/${baseResourceId}/comments`).query({ page }).toString(),
      urlParams: { page, [`${baseResourceName.slice(0, -1)}Id`]: baseResourceId },
      responseSchema: [commentsSchema],
    },
  };
}

export default function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${TYPES.LOAD}_FULFILLED`:
      return getPagingFns(action.payload.request.urlParams).update(state, action.payload);
    default:
      return state;
  }
}
