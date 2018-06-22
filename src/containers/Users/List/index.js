import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { loadUsers, getPagingFns as getUsersPagingFns } from '../../../store/ducks/users';
import {
  loadAdmins,
  unsetSelectedUser,
  getPagingFns as getAdminsPagingFns,
  getSelectedUserEntity,
} from '../../../store/ducks/admins';
import { getIsFetching } from '../../../store/ducks/loading';
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
    loading: isEmpty(users) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    users,
    selectedUser: getSelectedUserEntity(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, admins } = ownProps;
  const loadFn = admins ? loadAdmins : loadUsers;

  return {
    loadUsers: ({ page, ...query }) => dispatch(loadFn(page, majorId, query)),
    unsetSelectedUser: () => dispatch(unsetSelectedUser()),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList));
