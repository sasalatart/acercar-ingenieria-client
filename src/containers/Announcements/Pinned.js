import { connect } from 'react-redux';
import {
  loadPinnedAnnouncements,
  getPinnedAnnouncements,
} from '../../store/ducks/announcements';
import PinnedAnnouncements from '../../components/Announcements/Pinned';

function mapStateToProps(state) {
  return {
    announcements: getPinnedAnnouncements(state),
  };
}

const mapDispatchToProps = {
  loadPinnedAnnouncements,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinnedAnnouncements);
