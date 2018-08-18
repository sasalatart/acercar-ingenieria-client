import { connect } from 'react-redux';
import { setLocale, getLocale } from '../../../store/ducks/i18n';
import { signOut, getCurrentUserEntity } from '../../../store/ducks/sessions';
import {
  loadNotificationsCount,
  setNotificationsCount,
  getNotificationsCount,
} from '../../../store/ducks/notifications';
import Header from '../../../components/Layout/Header';

function mapStateToProps(state) {
  return {
    locale: getLocale(state),
    currentUser: getCurrentUserEntity(state),
    notificationsCount: getNotificationsCount(state),
  };
}

const mapDispatchToProps = {
  setLocale,
  loadNotificationsCount,
  setNotificationsCount,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
