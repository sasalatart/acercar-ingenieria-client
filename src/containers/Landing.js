import { connect } from 'react-redux';
import {
  loadPinned,
  getPinnedAnnouncements,
} from '../store/ducks/announcements';
import { goToMajors } from '../store/ducks/router';
import Landing from '../components/Landing';

function mapStateToProps(state) {
  return {
    announcements: getPinnedAnnouncements(state),
  };
}

const mapDispatchToProps = {
  loadPinned,
  goToMajors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);
