import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadUsers,
  resetPagination as resetUsersPagination,
  getPagingFns as getUsersPagingFns,
} from '../../../store/ducks/users';
import {
  loadAdmins,
  setSelectedUser,
  unsetSelectedUser,
  resetPagination as resetAdminsPagination,
  getPagingFns as getAdminsPagingFns,
  getSelectedUserEntity,
} from '../../../store/ducks/admins';
import { getIsFetching } from '../../../store/ducks/loading';
import withAuthorization from '../../../hoc/withAuthorization';
import UsersList from '../../../components/Users/List';
import { getCollectionParams as getAdminsCollectionParams } from '../../../lib/admins';
import { getCollectionParams as getUsersCollectionParams } from '../../../lib/users';

function mapStateToProps(state, { majorId, admins }) {
  const paramsFn = admins ? getAdminsCollectionParams : getUsersCollectionParams;
  const params = { ...paramsFn(majorId), paged: true };

  const pagingFnsGetter = admins ? getAdminsPagingFns : getUsersPagingFns;
  const pagingFns = pagingFnsGetter(params, true).selectors;

  const users = pagingFns.getPagedEntities(state, params);

  return {
    currentUserId: getCurrentUserId(state),
    loading: isEmpty(users) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    users,
    selectedUser: getSelectedUserEntity(state),
  };
}

function mapDispatchToProps(dispatch, { majorId, admins }) {
  const loadFn = admins ? loadAdmins : loadUsers;
  const resetPaginationFn = admins ? resetAdminsPagination : resetUsersPagination;

  return {
    loadUsers: ({ page, ...query }) => dispatch(loadFn(page, majorId, query)),
    setSelectedUser: userId => dispatch(setSelectedUser(userId)),
    unsetSelectedUser: () => dispatch(unsetSelectedUser()),
    resetPagination: () => dispatch(resetPaginationFn({ baseResourceId: majorId })),
  };
}

const component = connect(mapStateToProps, mapDispatchToProps)(UsersList);
export default injectIntl(withAuthorization(component));
