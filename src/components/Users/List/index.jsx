import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List, Modal } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ActionBar from '../../../containers/Users/List/ActionBar';
import Title from '../../Layout/Title';
import PaginationControls from '../../../containers/Pagination';
import UserListItem from '../../../containers/Users/List/Item';
import AdminStatusPanel from '../AdminStatus/Panel';
import { paginationShape, userShape } from '../../../shapes';

export default class UsersList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    admins: PropTypes.bool,
    pagination: paginationShape,
    users: PropTypes.arrayOf(userShape),
    selectedUser: userShape,
    loadUsers: PropTypes.func.isRequired,
    unsetSelectedUser: PropTypes.func.isRequired,
    withTitle: PropTypes.bool,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    admins: false,
    pagination: undefined,
    users: [],
    selectedUser: undefined,
    withTitle: false,
  }

  renderUser = user => <UserListItem user={user} majorId={this.props.majorId} />;

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
      loading,
      majorId,
      admins,
      pagination,
      users,
      selectedUser,
      withTitle,
      loadUsers,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        {withTitle && <ActionBar majorId={majorId} admins={admins} />}
        {withTitle && <Title text={t({ id: 'users' })} />}

        <PaginationControls
          pagination={pagination}
          loading={loading}
          noData={!loading && isEmpty(users)}
          loadFn={loadUsers}
          render={() => (
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={this.renderUser}
            />
          )}
        />
        {selectedUser && this.renderAdminStatusPanelModal()}
      </div>
    );
  }
}
