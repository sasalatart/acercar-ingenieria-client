import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadDiscussion,
  getDiscussionEntity,
} from '../../store/ducks/discussions';
import WithAuthorization from '../../hoc/WithAuthorization';
import Discussion from '../../components/Discussion/index';

function mapStateToProps(state, ownProps) {
  const { discussionId } = ownProps.match.params;
  const discussion = getDiscussionEntity(state, ownProps.match.params);

  return {
    loading: !!discussionId && !discussion,
    discussion,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { discussionId } = ownProps.match.params;

  return {
    loadDiscussion: () => dispatch(loadDiscussion(discussionId)),
  };
}

export default injectIntl(WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Discussion)));
