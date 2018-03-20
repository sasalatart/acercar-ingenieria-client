import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadDiscussions,
  getPagingFns,
} from '../../../store/ducks/discussions';
import { getIsFetching } from '../../../store/ducks/loading';
import WithAuthorization from '../../../hoc/WithAuthorization';
import DiscussionsList from '../../../components/Discussions/List';

function mapStateToProps(state, ownProps) {
  const params = { collection, paged: true, suffix: ownProps.mine ? 'mine' : undefined };
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
    loadDiscussions: (page = 1) => dispatch(loadDiscussions(page, ownProps.mine)),
  };
}

export default injectIntl(WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscussionsList)));
