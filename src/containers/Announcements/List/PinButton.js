import { connect } from 'react-redux';
import {
  updatePinned,
  getUpdatingIds,
} from '../../../store/ducks/announcements';
import PinButton from '../../../components/Announcements/List/PinButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getUpdatingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onUpdate: () => dispatch(updatePinned(ownProps.id, !ownProps.pinned)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinButton);
