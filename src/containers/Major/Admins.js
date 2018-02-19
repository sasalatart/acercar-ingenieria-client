import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { addQueryToMajorPath } from '../../store/ducks/majors';
import {
  loadMajorAdmins,
  getMajorAdminEntities,
  getMajorAdminsPaginationMeta,
} from '../../store/ducks/admins';
import { goToUser, getActivePage } from '../../routes';
import MajorAdmins from '../../components/Major/Admins';

function mapStateToProps(state, ownProps) {
  const { match, location } = ownProps;
  const majorId = +match.params.majorId;
  const activePage = getActivePage(location.search);

  const params = { majorId, page: activePage };

  return {
    majorId,
    pagination: getMajorAdminsPaginationMeta(state, params),
    majorAdmins: getMajorAdminEntities(state, params),
  };
}

const mapDispatchToProps = {
  loadMajorAdmins,
  goToUser,
  addQueryToMajorPath,
};

export default injectIntl(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorAdmins)));
