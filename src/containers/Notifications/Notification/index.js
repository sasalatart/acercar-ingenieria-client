import { connect } from 'react-redux';
import { getCurrentUserId, getIsAdminOrMajorAdmin } from '../../../store/ducks/sessions';
import Notification from '../../../components/Notifications/Notification';

function mapStateToProps(state, ownProps) {
  const { majorId, authorId } = ownProps.notification.notifyableMeta;

  return {
    seeDisabled: getIsAdminOrMajorAdmin(state, { majorId })
      || (!!authorId && getCurrentUserId(state) === authorId),
  };
}

export default connect(mapStateToProps)(Notification);
