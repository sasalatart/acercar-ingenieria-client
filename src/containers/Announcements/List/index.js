import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  pagingFns,
  loadAnnouncements,
} from '../../../store/ducks/announcements';
import { getIsFetching } from '../../../store/ducks/loading';
import Announcements from '../../../components/Announcements/List';

function mapStateToProps(state) {
  const params = { collection, paged: true };
  const announcements = pagingFns.selectors.getPagedEntities(state);

  return {
    loading: isEmpty(announcements) && getIsFetching(state, params),
    announcements,
    pagination: pagingFns.selectors.getMeta(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAnnouncements: ({ page }) => dispatch(loadAnnouncements(page)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcements));
