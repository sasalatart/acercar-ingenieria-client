import { connect } from 'react-redux';
import { getCurrentUserEntity, getIsAdminOrMajorAdmin } from '../../../store/ducks/sessions';
import Notification from '../../../components/Notifications/Notification';

function mapStateToProps(state, ownProps) {
  const currentUser = getCurrentUserEntity(state);
  const { majorId, authorId } = ownProps.notification.notifyableMeta;

  return {
    seeDisabled: getIsAdminOrMajorAdmin(state, { majorId })
      || (!!authorId && currentUser.id === authorId),
  };
}

export default connect(mapStateToProps)(Notification);
