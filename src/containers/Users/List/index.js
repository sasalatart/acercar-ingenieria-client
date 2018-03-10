import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadUsers,
  getPagingFns,
} from '../../../store/ducks/users';
import UsersList from '../../../components/Users/List';

function mapStateToProps(state, ownProps) {
  const { majorId } = ownProps;
  const pagingFns = getPagingFns(majorId);
  const params = { majorId };

  const users = pagingFns.getPagedEntities(state, params);

  return {
    loading: !users || users.isEmpty(),
    pagination: pagingFns.getMeta(state, params),
    users,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadUsers: (page = 1) => dispatch(loadUsers(page, ownProps.majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList));
