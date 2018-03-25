import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import {
  collection,
  loadDiscussions,
  resetPagination,
  getPagingFns,
} from '../../../store/ducks/discussions';
import { getIsFetching } from '../../../store/ducks/loading';
import WithAuthorization from '../../../hoc/WithAuthorization';
import DiscussionsList from '../../../components/Discussions/List';

function mapStateToProps(state, ownProps) {
  const params = { collection, paged: true, suffix: ownProps.mine ? 'mine' : 'forum' };
  const pagingFns = getPagingFns(ownProps.mine);

  const discussions = pagingFns.selectors.getPagedEntities(state);

  return {
    loading: isEmpty(discussions) && getIsFetching(state, params),
    pagination: pagingFns.selectors.getMeta(state),
    discussions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadDiscussions: ({ page, ...query }) => dispatch(loadDiscussions(page, ownProps.mine, query)),
    onTagClick: (text) => {
      dispatch(resetPagination(ownProps.mine));
      dispatch(addQueryToCurrentUri({ tagList: text }));
    },
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(DiscussionsList);
export default injectIntl(WithAuthorization(connectedComponent));
