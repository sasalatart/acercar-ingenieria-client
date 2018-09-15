import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadAnnouncements, getPaginationData, getIsLoadingAnnouncements } from '../../../store/ducks/announcements';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withModal from '../../../hoc/withModal';
import Announcements from '../../../components/Announcements/List';

function mapStateToProps(state) {
  const { paginationInfo, pagedEntities: announcements } = getPaginationData(state);
  const params = { page: paginationInfo.page };
  return {
    ...getPlaceholderFlags(getIsLoadingAnnouncements(state, params), announcements),
    announcements,
    paginationInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAnnouncements: query => dispatch(loadAnnouncements({ query })),
  };
}

export default compose(
  withModal,
  connect(mapStateToProps, mapDispatchToProps),
)(Announcements);
