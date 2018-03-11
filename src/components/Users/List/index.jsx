import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { List, Modal } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import UserListItem from '../../../containers/Users/List/Item';
import AdminStatusPanel from '../AdminStatus/Panel';
import { paginationShape, userShape } from '../../../shapes';

class UsersList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    users: ImmutablePropTypes.setOf(userShape),
    selectedUser: userShape,
    loadUsers: PropTypes.func.isRequired,
    unsetSelectedUser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    users: undefined,
    selectedUser: undefined,
  }

  renderUser = user => <UserListItem user={user} />;

  renderAdminStatusPanelModal() {
    const { selectedUser, unsetSelectedUser, intl: { formatMessage: t } } = this.props;
    const { firstName, lastName } = selectedUser;

    return (
      <Modal
        title={t({ id: 'admins.changeStatusFor' }, { userName: `${firstName} ${lastName}` })}
        onCancel={unsetSelectedUser}
        footer={null}
        visible
      >
        <AdminStatusPanel user={selectedUser} />
      </Modal>
    );
  }

  render() {
    const {
      loading, pagination, users, selectedUser, loadUsers,
    } = this.props;

    return (
      <div>
        <PaginationControls
          pagination={pagination}
          loading={loading}
          loadFn={loadUsers}
          render={() => (
            <List
              itemLayout="horizontal"
              dataSource={users.toJS()}
              renderItem={this.renderUser}
            />
          )}
        />
        {selectedUser && this.renderAdminStatusPanelModal()}
      </div>
    );
  }
}

export default UsersList;
