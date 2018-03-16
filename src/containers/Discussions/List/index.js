import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadDiscussions,
  getPagingFns,
} from '../../../store/ducks/discussions';
import WithAuthorization from '../../../hoc/WithAuthorization';
import DiscussionsList from '../../../components/Discussions/List';

function mapStateToProps(state, ownProps) {
  const pagingFns = getPagingFns(ownProps.mine);

  const discussions = pagingFns.selectors.getPagedEntities(state);

  return {
    loading: !discussions || !discussions.size,
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
