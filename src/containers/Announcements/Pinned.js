import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadPinnedAnnouncements,
  getPinnedAnnouncementsEntities,
} from '../../store/ducks/announcements';
import { getIsFetching } from '../../store/ducks/loading';
import WithAuthorization from '../../hoc/WithAuthorization';
import PinnedAnnouncements from '../../components/Announcements/Pinned';

function mapStateToProps(state) {
  const params = { collection, suffix: 'pinned' };
  const announcements = getPinnedAnnouncementsEntities(state);

  return {
    loading: isEmpty(announcements) && getIsFetching(state, params),
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
