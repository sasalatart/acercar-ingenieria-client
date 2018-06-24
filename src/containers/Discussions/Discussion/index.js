import { connect } from 'react-redux';
import { goToDiscussions } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadDiscussion,
  getDiscussionEntity,
  getDiscussionSummaryEntity,
} from '../../../store/ducks/discussions';
import { getIsFetching } from '../../../store/ducks/loading';
import withLoadableResource from '../../../hoc/withLoadableResource';
import Discussion from '../../../components/Discussions/Discussion';
import collections from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection: collections.discussions };
  const discussion = getDiscussionEntity(state, params)
    || getDiscussionSummaryEntity(state, params);

  return {
    isAuthor: !!(discussion && getCurrentUserId(state) === discussion.author.id),
    loading: !discussion && getIsFetching(state, params),
    discussion,
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id } } }) {
  return {
    loadDiscussion: () => dispatch(loadDiscussion(id)),
    onDestroy: () => dispatch(goToDiscussions()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadDiscussion', 'discussion')(Discussion));
