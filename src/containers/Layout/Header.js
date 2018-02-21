import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToSignIn, goToSignUp } from '../../store/ducks/routes';
import { signOut, getCurrentUserEntity } from '../../store/ducks/sessions';
import Header from '../../components/Layout/Header';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
  };
}

const mapDispatchToProps = {
  goToSignIn,
  goToSignUp,
  signOut,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));
