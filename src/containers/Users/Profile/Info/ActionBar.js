import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToLanding } from '../../../../store/ducks/routes';
import { getCurrentUserEntity } from '../../../../store/ducks/sessions';
import WithAuthorization from '../../../../hoc/WithAuthorization';
import ActionBar from '../../../../components/Users/Profile/Info/ActionBar';

function mapStateToProps(state, ownProps) {
  const { user } = ownProps;
  const currentUser = getCurrentUserEntity(state);

  return {
    isOwner: !!(user && user.id === currentUser.id),
    user,
  };
}

const mapDispatchToProps = {
  goToLanding,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
