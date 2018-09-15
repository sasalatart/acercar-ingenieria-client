import { connect } from 'react-redux';
import { goToDiscussions } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadDiscussion,
  getDiscussionEntity,
  getDiscussionSummaryEntity,
  getIsLoadingDiscussion,
} from '../../../store/ducks/discussions';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withLoadableResource from '../../../hoc/withLoadableResource';
import Discussion from '../../../components/Discussions/Discussion';

function mapStateToProps(state, { match: { params } }) {
  const discussion = getDiscussionEntity(state, params)
    || getDiscussionSummaryEntity(state, params);

  return {
    ...getPlaceholderFlags(getIsLoadingDiscussion(state, params), discussion),
    isAuthor: !!(discussion && getCurrentUserId(state) === discussion.author.id),
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
