import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToUser } from '../../store/ducks/routes';
import {
  loadAdmins,
  getPagingFns,
} from '../../store/ducks/admins';
import MajorAdmins from '../../components/Major/Admins';

function mapStateToProps(state, ownProps) {
  const params = { majorId: ownProps.majorId };
  const pagingFns = getPagingFns(params.majorId);

  const majorAdmins = pagingFns.getPagedEntities(state, params);

  return {
    loading: !majorAdmins || majorAdmins.isEmpty(),
    pagination: pagingFns.getMeta(state, params),
    majorAdmins,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadAdmins: (page = 1) => dispatch(loadAdmins(page, ownProps.majorId)),
    goToUser: id => dispatch(goToUser(id)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorAdmins));
