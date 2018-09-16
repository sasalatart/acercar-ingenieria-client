import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadUsers,
  resetPagination as resetUsersPagination,
  getPaginationData as getUsersPaginationData,
  getIsLoadingUsers,
} from '../../../store/ducks/users';
import {
  loadAdmins,
  setSelectedUser,
  unsetSelectedUser,
  resetPagination as resetAdminsPagination,
  getSelectedUserEntity,
  getPaginationData as getAdminsPaginationData,
  getIsLoadingAdmins,
} from '../../../store/ducks/admins';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withAuthorization from '../../../hoc/withAuthorization';
import UsersList from '../../../components/Users/List';

function mapStateToProps(state, { match, majorId, admins }) {
  const params = { baseId: majorId || match.params.majorId };
  const getPaginationData = admins ? getAdminsPaginationData : getUsersPaginationData;
  const getIsLoading = admins ? getIsLoadingAdmins : getIsLoadingUsers;
  const { paginationInfo, pagedEntities: users } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoading(state, params), users),
    majorId: +params.baseId,
    currentUserId: getCurrentUserId(state),
    paginationInfo,
    users,
    selectedUser: getSelectedUserEntity(state),
  };
}

function mapDispatchToProps(dispatch, { match, majorId, admins }) {
  const loadFn = admins ? loadAdmins : loadUsers;
  return {
    ...bindActionCreators({
      setSelectedUser,
      unsetSelectedUser,
      resetPagination: admins ? resetAdminsPagination : resetUsersPagination,
    }, dispatch),
    loadUsers: query => dispatch(loadFn({ baseId: majorId || match.params.majorId, query })),
  };
}

export default compose(
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps),
)(UsersList);
