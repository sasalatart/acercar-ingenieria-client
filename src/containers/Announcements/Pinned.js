import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  loadPinnedAnnouncements,
  getPinnedAnnouncementsEntities,
} from '../../store/ducks/announcements';
import { getIsFetching } from '../../store/ducks/loading';
import WithLoadableResource from '../../hoc/WithLoadableResource';
import WithAuthorization from '../../hoc/WithAuthorization';
import PinnedAnnouncements from '../../components/Announcements/Pinned';
import collections from '../../lib/collections';
import { suffixes } from '../../lib/announcements';

function mapStateToProps(state) {
  const params = { collection: collections.announcements, suffix: suffixes.pinned };
  const announcements = getPinnedAnnouncementsEntities(state);

  return {
    loading: isEmpty(announcements) && getIsFetching(state, params),
    announcements,
  };
}

const mapDispatchToProps = {
  loadPinnedAnnouncements,
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadableResource('loadPinnedAnnouncements', 'announcements')(PinnedAnnouncements));

export default WithAuthorization(connectedComponent);
