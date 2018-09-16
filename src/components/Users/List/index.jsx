import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List, Modal } from 'antd';
import Pagination from '../../../containers/Layout/Pagination';
import Title from '../../Layout/Title';
import ActionBar from './ActionBar';
import UserListItem from './Item';
import AdminStatusPanel from '../AdminStatus/Panel';
import { paginationInfoShape, userShape } from '../../../shapes';

export default class UsersList extends Component {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    admin: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    admins: PropTypes.bool,
    paginationInfo: paginationInfoShape.isRequired,
    users: PropTypes.arrayOf(userShape).isRequired,
    selectedUser: userShape,
    loadUsers: PropTypes.func.isRequired,
    setSelectedUser: PropTypes.func.isRequired,
    unsetSelectedUser: PropTypes.func.isRequired,
    withTitle: PropTypes.bool,
  }

  static defaultProps = {
    majorId: undefined,
    admins: false,
    selectedUser: undefined,
    withTitle: false,
  }

  renderUser = user => (
    <UserListItem
      currentUserId={this.props.currentUserId}
      admin={this.props.admin}
      adminOrMajorAdmin={this.props.adminOrMajorAdmin}
      user={user}
      setSelectedUser={() => this.props.setSelectedUser(user.id)}
    />
  );

  renderAdminStatusPanelModal() {
    const { selectedUser, unsetSelectedUser } = this.props;
    const { firstName, lastName } = selectedUser;

    return (
      <Modal
        title={<FormattedMessage id="admins.changeStatusFor" values={{ userName: `${firstName} ${lastName}` }} />}
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
      noData,
      paginationInfo,
      users,
      selectedUser,
      withTitle,
      loadUsers: load,
      ...restProps
    } = this.props;

    return (
      <Fragment>
        {withTitle && <ActionBar {...restProps} />}
        {withTitle && <Title><FormattedMessage id="users" /></Title>}

        <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
          <List itemLayout="horizontal" dataSource={users} renderItem={this.renderUser} />
        </Pagination>

        {selectedUser && this.renderAdminStatusPanelModal()}
      </Fragment>
    );
  }
}
