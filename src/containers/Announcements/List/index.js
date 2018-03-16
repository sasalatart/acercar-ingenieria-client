import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  pagingFns,
  loadAnnouncements,
} from '../../../store/ducks/announcements';
import Announcements from '../../../components/Announcements/List';

function mapStateToProps(state) {
  const announcements = pagingFns.selectors.getPagedEntities(state);

  return {
    loading: !announcements || !announcements.size,
    announcements,
    pagination: pagingFns.selectors.getMeta(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAnnouncements: (page = 1) => dispatch(loadAnnouncements(page)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcements));
