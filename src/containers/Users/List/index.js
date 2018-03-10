import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadUsers,
  getPagingFns as getUsersPagingFns,
} from '../../../store/ducks/users';
import {
  loadAdmins,
  getPagingFns as getAdminsPagingFns,
} from '../../../store/ducks/admins';
import UsersList from '../../../components/Users/List';

function mapStateToProps(state, ownProps) {
  const { majorId, admins } = ownProps;
  const params = { majorId };

  const pagingFns = admins
    ? getAdminsPagingFns(majorId)
    : getUsersPagingFns(majorId);

  const users = pagingFns.getPagedEntities(state, params);

  return {
    loading: !users || users.isEmpty(),
    pagination: pagingFns.getMeta(state, params),
    users,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, admins } = ownProps;
  const loadFn = admins ? loadAdmins : loadUsers;

  return {
    loadUsers: (page = 1) => dispatch(loadFn(page, majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList));
