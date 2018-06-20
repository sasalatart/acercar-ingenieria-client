import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { pagingFns, loadAnnouncements } from '../../../store/ducks/announcements';
import { getIsFetching } from '../../../store/ducks/loading';
import WithModal from '../../../hoc/WithModal';
import Announcements from '../../../components/Announcements/List';
import collections from '../../../lib/collections';

function mapStateToProps(state) {
  const params = { collection: collections.announcements, paged: true };
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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Announcements);

export default injectIntl(WithModal(connectedComponent));
