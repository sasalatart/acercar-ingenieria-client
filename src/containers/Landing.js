import { connect } from 'react-redux';
import {
  loadPinned,
  getPinnedAnnouncements,
} from '../store/ducks/announcements';
import Landing from '../components/Landing';

function mapStateToProps(state) {
  return {
    announcements: getPinnedAnnouncements(state),
  };
}

const mapDispatchToProps = {
  loadPinned,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);
