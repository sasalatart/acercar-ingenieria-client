import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { signOut, getCurrentUserEntity } from '../../../store/ducks/sessions';
import { loadNotificationsCount, getNotificationsCount } from '../../../store/ducks/notifications';
import Header from '../../../components/Layout/Header';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
    notificationsCount: getNotificationsCount(state),
  };
}

const mapDispatchToProps = {
  loadNotificationsCount,
  signOut,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));
