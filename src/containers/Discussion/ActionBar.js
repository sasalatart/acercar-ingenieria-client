import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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

const connectedComponent = connect(mapStateToProps)(DiscussionActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
