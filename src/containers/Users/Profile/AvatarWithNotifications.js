import { connect } from 'react-redux';
import { getCurrentUserEntity } from '../../../store/ducks/sessions';
import {
  loadNotificationsCount,
  setNotificationsCount,
  getNotificationsCount,
} from '../../../store/ducks/notifications';
import ProfileAvatar from '../../../components/Users/Profile/AvatarWithNotifications';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
    notificationsCount: getNotificationsCount(state),
  };
}

const mapDispatchToProps = {
  loadNotificationsCount,
  setNotificationsCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
