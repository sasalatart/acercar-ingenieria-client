import { connect } from 'react-redux';
import { updatePinned } from '../../../store/ducks/announcements';
import { getIsUpdating } from '../../../store/ducks/loading';
import PinButton from '../../../components/Announcements/List/PinButton';
import collections from '../../../lib/collections';

function mapStateToProps(state, { id }) {
  const params = { collection: collections.announcements, id };

  return {
    loading: getIsUpdating(state, params),
  };
}

function mapDispatchToProps(dispatch, { id, pinned }) {
  return {
    onUpdate: () => dispatch(updatePinned(id, !pinned)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinButton);
