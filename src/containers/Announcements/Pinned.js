import { connect } from 'react-redux';
import {
  loadPinnedAnnouncements,
  getPinnedAnnouncementsEntities,
  getIsLoadingPinned,
} from '../../store/ducks/announcements';
import { getPlaceholderFlags } from '../../store/ducks/shared';
import withLoadableResource from '../../hoc/withLoadableResource';
import withAuthorization from '../../hoc/withAuthorization';
import PinnedAnnouncements from '../../components/Announcements/Pinned';

function mapStateToProps(state) {
  const announcements = getPinnedAnnouncementsEntities(state);
  return {
    ...getPlaceholderFlags(getIsLoadingPinned(state), announcements),
    announcements,
  };
}

const mapDispatchToProps = {
  loadPinnedAnnouncements,
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadPinnedAnnouncements', 'announcements')(PinnedAnnouncements));

export default withAuthorization(component);
