import { connect } from 'react-redux';
import { updatePinned } from '../../../store/ducks/announcements';
import { getIsUpdating } from '../../../store/ducks/loading';
import PinButton from '../../../components/Announcements/List/PinButton';
import collections from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { collection: collections.announcements, id: ownProps.id };

  return {
    loading: getIsUpdating(state, params),
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
