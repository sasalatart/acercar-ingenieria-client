import { connect } from 'react-redux';
import { getCurrentUserId, getIsAdminOrMajorAdmin } from '../../../store/ducks/sessions';
import Notification from '../../../components/Notifications/Notification';

function mapStateToProps(state, { notification: { notifyableMeta: { majorId, authorId } } }) {
  const adminOrMajorAdmin = getIsAdminOrMajorAdmin(state, { majorId });
  const isAuthor = !!authorId && getCurrentUserId(state) === authorId;

  return {
    seeDisabled: adminOrMajorAdmin || isAuthor,
  };
}

export default connect(mapStateToProps)(Notification);
