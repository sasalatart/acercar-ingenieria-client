import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  getCollectionParams,
  loadUsers,
  getPagingFns as getUsersPagingFns,
} from '../../../store/ducks/users';
import {
  loadAdmins,
  unsetSelectedUser,
  getPagingFns as getAdminsPagingFns,
  getSelectedUserEntity,
} from '../../../store/ducks/admins';
import { getIsFetching } from '../../../store/ducks/loading';
import UsersList from '../../../components/Users/List';

function mapStateToProps(state, ownProps) {
  const { majorId, admins } = ownProps;
  const params = { ...getCollectionParams(majorId, admins), paged: true };

  const pagingFns = admins
    ? getAdminsPagingFns(majorId)
    : getUsersPagingFns(majorId);

  const users = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: isEmpty(users) && getIsFetching(state, params),
    pagination: pagingFns.selectors.getMeta(state, params),
    users,
    selectedUser: getSelectedUserEntity(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, admins } = ownProps;
  const loadFn = admins ? loadAdmins : loadUsers;

  return {
    loadUsers: (page = 1) => dispatch(loadFn(page, majorId)),
    unsetSelectedUser: () => dispatch(unsetSelectedUser()),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList));
