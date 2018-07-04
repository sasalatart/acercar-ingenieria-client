import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadDiscussions,
  resetPagination,
  getPagingFns,
} from '../../../store/ducks/discussions';
import { getIsFetching } from '../../../store/ducks/loading';
import withAuthorization from '../../../hoc/withAuthorization';
import DiscussionsList from '../../../components/Discussions/List';
import { getSuffix } from '../../../lib/discussions';
import collections from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = {
    collection: collections.discussions, suffix: getSuffix(ownProps.mine), paged: true,
  };
  const pagingFns = getPagingFns(params, true).selectors;

  const discussionSummaries = pagingFns.getPagedEntities(state);

  return {
    currentUserId: getCurrentUserId(state),
    loading: isEmpty(discussionSummaries) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state),
    discussionSummaries,
  };
}

function mapDispatchToProps(dispatch, { mine }) {
  const suffix = getSuffix(mine);

  return {
    loadDiscussions: ({ page, ...query }) => dispatch(loadDiscussions(page, mine, query)),
    resetPagination: () => dispatch(resetPagination({ suffix })),
    onTagClick: (text) => {
      dispatch(resetPagination({ suffix }));
      dispatch(addQueryToCurrentUri({ tagList: text }));
    },
  };
}

const component = connect(mapStateToProps, mapDispatchToProps)(DiscussionsList);
export default injectIntl(withAuthorization(component));
