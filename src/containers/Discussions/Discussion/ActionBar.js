import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToDiscussions } from '../../../store/ducks/routes';
import { getCurrentUserEntity } from '../../../store/ducks/sessions';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../components/Discussions/Discussion/ActionBar';

function mapStateToProps(state, { discussion }) {
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: !!(currentUser && discussion && currentUser.id === discussion.author.id),
  };
}

const mapDispatchToProps = {
  onDestroy: goToDiscussions,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
