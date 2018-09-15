import { connect } from 'react-redux';
import { togglePinned, getIsTogglingPin } from '../../../store/ducks/announcements';
import PinButton from '../../../components/Announcements/List/PinButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getIsTogglingPin(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, { id, pinned }) {
  return {
    onUpdate: () => dispatch(togglePinned(id, !pinned)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PinButton);
