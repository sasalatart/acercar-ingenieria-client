import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import withModal from '../../../hoc/withModal';
import EmailForm from '../../../containers/Majors/Major/Email/Form';
import SearchButtons from '../../../containers/Search/Buttons';
import Pagination from '../../../containers/Layout/Pagination';
import UserListItem from './Item';
import AdminStatusPanel from '../AdminStatus/Panel';
import HideableButton from '../../Icons/HideableButton';
import { paginationInfoShape, userShape } from '../../../shapes';

class UsersList extends Component {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    admin: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    fromMajor: PropTypes.bool,
    paginationInfo: paginationInfoShape.isRequired,
    users: PropTypes.arrayOf(userShape).isRequired,
    selectedUser: userShape,
    loadUsers: PropTypes.func.isRequired,
    setSelectedUser: PropTypes.func.isRequired,
    unsetSelectedUser: PropTypes.func.isRequired,
    renderHeader: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
    onModalOpen: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    fromMajor: false,
    selectedUser: undefined,
  }

  getActions() {
    const {
      adminOrMajorAdmin,
      majorId,
      fromMajor,
      onModalOpen,
      resetPagination,
    } = this.props;

    const actions = [
      <SearchButtons
        key="search"
        searchTextLabel={<FormattedMessage id="search.users" />}
        beforeSearch={resetPagination}
      />,
    ];

    if (adminOrMajorAdmin && majorId && fromMajor) {
      const contactButton = (
        <HideableButton key="email" onClick={onModalOpen} icon="envelope">
          <FormattedMessage id="majors.email" />
        </HideableButton>
      );

      actions.push(contactButton);
    }

    return actions;
  }

  handleRoleButtonClick = (userId) => {
    this.props.setSelectedUser(userId);
    this.props.onModalOpen();
  };

  renderUser = user => (
    <UserListItem
      currentUserId={this.props.currentUserId}
      admin={this.props.admin}
      adminOrMajorAdmin={this.props.adminOrMajorAdmin}
      user={user}
      onRoleButtonClick={this.handleRoleButtonClick}
    />
  );

  renderAdminStatusPanelModal() {
    const { selectedUser, unsetSelectedUser: onCancel, renderModal } = this.props;
    const userName = `${selectedUser.firstName} ${selectedUser.lastName}`;
    const title = <FormattedMessage id="admins.changeStatusFor" values={{ userName }} />;
    return renderModal(title, <AdminStatusPanel user={selectedUser} />, { onCancel });
  }

  renderMajorEmailModal() {
    const title = <FormattedMessage id="majors.email" />;
    return this.props.renderModal(title, <EmailForm majorId={this.props.majorId} />);
  }

  render() {
    const {
      loading,
      noData,
      fromMajor,
      paginationInfo,
      users,
      selectedUser,
      loadUsers: load,
      renderHeader,
    } = this.props;

    return (
      <Fragment>
        {renderHeader({
          subtitle: fromMajor ? <FormattedMessage id="users" /> : undefined,
          actions: this.getActions(),
        })}

        <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
          <List itemLayout="horizontal" dataSource={users} renderItem={this.renderUser} />
        </Pagination>

        {selectedUser
          ? this.renderAdminStatusPanelModal()
          : fromMajor && this.renderMajorEmailModal()
        }
      </Fragment>
    );
  }
}

export default withModal(UsersList);
