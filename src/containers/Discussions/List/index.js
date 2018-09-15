import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadDiscussions,
  resetPagination,
  getPaginationData,
  getIsLoadingDiscussions,
} from '../../../store/ducks/discussions';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withAuthorization from '../../../hoc/withAuthorization';
import DiscussionsList from '../../../components/Discussions/List';
import { getSuffix } from '../../../lib/discussions';

function mapStateToProps(state, ownProps) {
  const params = { suffix: getSuffix(ownProps.mine) };
  const { paginationInfo, pagedEntities: discussionSummaries } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoadingDiscussions(state, params), discussionSummaries),
    currentUserId: getCurrentUserId(state),
    paginationInfo,
    discussionSummaries,
  };
}

function mapDispatchToProps(dispatch, { mine }) {
  return {
    ...bindActionCreators({ resetPagination }, dispatch),
    loadDiscussions: query => dispatch(loadDiscussions({ query, suffix: getSuffix(mine) })),
    onTagClick: (text) => {
      dispatch(resetPagination());
      dispatch(addQueryToCurrentUri({ tagList: text }));
    },
  };
}

export default compose(
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps),
)(DiscussionsList);
