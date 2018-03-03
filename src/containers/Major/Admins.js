import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  goToUser,
  getPage,
} from '../../store/ducks/routes';
import {
  loadMajorAdmins,
  getMajorAdminEntities,
  getMajorAdminsPaginationMeta,
} from '../../store/ducks/admins';
import MajorAdmins from '../../components/Major/Admins';

function mapStateToProps(state, ownProps) {
  const { majorId } = ownProps;
  const params = { majorId, page: getPage(state) };

  const majorAdmins = getMajorAdminEntities(state, params);

  return {
    loading: !majorAdmins || majorAdmins.isEmpty(),
    pagination: getMajorAdminsPaginationMeta(state, params),
    majorAdmins,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMajorAdmins: (page = 1) => dispatch(loadMajorAdmins(page, ownProps.majorId)),
    goToUser: id => dispatch(goToUser(id)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorAdmins));
