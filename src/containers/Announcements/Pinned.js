import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  loadPinnedAnnouncements,
  getPinnedAnnouncementsEntities,
} from '../../store/ducks/announcements';
import { getIsFetching } from '../../store/ducks/loading';
import withLoadableResource from '../../hoc/withLoadableResource';
import withAuthorization from '../../hoc/withAuthorization';
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

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadPinnedAnnouncements', 'announcements')(PinnedAnnouncements));

export default injectIntl(withAuthorization(component));
