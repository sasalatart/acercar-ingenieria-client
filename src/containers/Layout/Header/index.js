import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { signOut, getCurrentUserEntity } from '../../../store/ducks/sessions';
import Header from '../../../components/Layout/Header';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
  };
}

const mapDispatchToProps = {
  signOut,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));
