import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List, Modal } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Layout/Pagination';
import Title from '../../Layout/Title';
import ActionBar from './ActionBar';
import UserListItem from './Item';
import AdminStatusPanel from '../AdminStatus/Panel';
import { paginationShape, userShape } from '../../../shapes';

export default class UsersList extends Component {
  static propTypes = {
    admin: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    admins: PropTypes.bool,
    pagination: paginationShape,
    users: PropTypes.arrayOf(userShape),
    selectedUser: userShape,
    loadUsers: PropTypes.func.isRequired,
    setSelectedUser: PropTypes.func.isRequired,
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

  renderUser = user => (
    <UserListItem
      admin={this.props.admin}
      adminOrMajorAdmin={this.props.adminOrMajorAdmin}
      user={user}
      majorId={this.props.majorId}
      setSelectedUser={() => this.props.setSelectedUser(user.id)}
      unsetSelectedUser={this.props.unsetSelectedUser}
    />
  );

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
      pagination,
      users,
      selectedUser,
      withTitle,
      loadUsers,
      intl: { formatMessage: t },
      ...restProps
    } = this.props;

    return (
      <Fragment>
        {withTitle && <ActionBar {...restProps} />}
        {withTitle && <Title>{t({ id: 'users' })}</Title>}

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
      </Fragment>
    );
  }
}
