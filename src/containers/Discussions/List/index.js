import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import {
  loadDiscussions,
  resetPagination,
  getPagingFns,
} from '../../../store/ducks/discussions';
import { getIsFetching } from '../../../store/ducks/loading';
import WithAuthorization from '../../../hoc/WithAuthorization';
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
    loading: isEmpty(discussionSummaries) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state),
    discussionSummaries,
  };
}

function mapDispatchToProps(dispatch, { mine }) {
  return {
    loadDiscussions: ({ page, ...query }) => dispatch(loadDiscussions(page, mine, query)),
    onTagClick: (text) => {
      dispatch(resetPagination({ suffix: getSuffix(mine) }));
      dispatch(addQueryToCurrentUri({ tagList: text }));
    },
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(DiscussionsList);
export default injectIntl(WithAuthorization(connectedComponent));
