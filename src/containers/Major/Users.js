import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { addQueryToMajorPath } from '../../store/ducks/majors';
import {
  loadMajorUsers,
  getPagedMajorUserEntities,
  getMajorUsersPaginationMeta,
} from '../../store/ducks/users';
import { getActivePage } from '../../routes';
import MajorUsers from '../../components/Major/Users';

function mapStateToProps(state, ownProps) {
  const { match, location } = ownProps;
  const majorId = +match.params.majorId;
  const activePage = getActivePage(location.search);

  const params = { majorId, page: activePage };

  return {
    majorId,
    pagination: getMajorUsersPaginationMeta(state, params),
    majorUsers: getPagedMajorUserEntities(state, params),
  };
}

const mapDispatchToProps = {
  loadMajorUsers,
  addQueryToMajorPath,
};

export default injectIntl(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorUsers)));
