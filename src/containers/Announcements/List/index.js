import { connect } from 'react-redux';
import { getPage } from '../../../store/ducks/routes';
import {
  pagingFns,
  loadAnnouncements,
} from '../../../store/ducks/announcements';
import Announcements from '../../../components/Announcements/List';

function mapStateToProps(state) {
  const params = { page: getPage(state) };
  const announcements = pagingFns.getPagedEntities(state, params);

  return {
    loading: !announcements || !announcements.size,
    announcements,
    pagination: pagingFns.getMeta(state, params),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAnnouncements: (page = 1) => dispatch(loadAnnouncements(page)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcements);
