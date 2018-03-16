import { connect } from 'react-redux';
import {
  loadPinnedAnnouncements,
  getPinnedAnnouncementsEntities,
} from '../../store/ducks/announcements';
import WithAuthorization from '../../hoc/WithAuthorization';
import PinnedAnnouncements from '../../components/Announcements/Pinned';

function mapStateToProps(state) {
  const announcements = getPinnedAnnouncementsEntities(state);

  return {
    loading: !announcements.length,
    announcements,
  };
}

const mapDispatchToProps = {
  loadPinnedAnnouncements,
};

export default WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinnedAnnouncements));
