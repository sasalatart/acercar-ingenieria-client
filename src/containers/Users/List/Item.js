import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  setSelectedUser,
  unsetSelectedUser,
} from '../../../store/ducks/admins';
import WithAuthorization from '../../../hoc/WithAuthorization';
import UserListItem from '../../../components/Users/List/Item';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setSelectedUser: () => dispatch(setSelectedUser(ownProps.user.id)),
    unsetSelectedUser: () => dispatch(unsetSelectedUser()),
  };
}

export default injectIntl(WithAuthorization(connect(
  null,
  mapDispatchToProps,
)(UserListItem)));
