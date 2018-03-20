import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToDiscussions } from '../../store/ducks/routes';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import WithAuthorization from '../../hoc/WithAuthorization';
import DiscussionActionBar from '../../components/Discussion/ActionBar';

function mapStateToProps(state, ownProps) {
  const { discussion } = ownProps;
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: !!(currentUser && discussion && currentUser.id === discussion.author.id),
  };
}

const mapDispatchToProps = {
  onDestroy: goToDiscussions,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(DiscussionActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
