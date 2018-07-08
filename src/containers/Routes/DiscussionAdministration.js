import { connect } from 'react-redux';
import {
  getIsAdmin,
  getCurrentUserId,
} from '../../store/ducks/sessions';
import { loadDiscussion, getDiscussionEntity } from '../../store/ducks/discussions';
import { getIsFetching } from '../../store/ducks/loading';
import withLoadableResource from '../../hoc/withLoadableResource';
import Restricted from '../../components/Routes/Restricted';
import collections from '../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection: collections.discussions };
  const discussion = getDiscussionEntity(state, params);
  const isAuthor = discussion && getCurrentUserId(state) === discussion.author.id;
  return {
    loading: !discussion && getIsFetching(state, params),
    restrictedCondition: getIsAdmin(state) || isAuthor,
    discussion,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params;
  return {
    loadDiscussion: () => dispatch(loadDiscussion(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadDiscussion', 'discussion')(Restricted));
