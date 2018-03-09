import { connect } from 'react-redux';
import {
  destroyAnnouncement,
  getDestroyingIds,
} from '../../../store/ducks/announcements';
import DestroyButton from '../../../components/DestroyButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDestroy: () => dispatch(destroyAnnouncement(ownProps.id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton);
