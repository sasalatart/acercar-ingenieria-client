import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  goToUser,
  addQueryToCurrentUri,
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
  const defaultPage = getPage(state);
  const props = { majorId, page: defaultPage };

  return {
    defaultPage,
    pagination: getMajorAdminsPaginationMeta(state, props),
    majorAdmins: getMajorAdminEntities(state, props),
  };
}

const mapDispatchToProps = {
  loadMajorAdmins,
  goToUser,
  addQueryToCurrentUri,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorAdmins));
