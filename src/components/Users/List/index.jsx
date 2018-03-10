import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import UserListItem from './Item';
import { paginationShape, userShape } from '../../../shapes';

class UsersList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    users: ImmutablePropTypes.setOf(userShape),
    loadUsers: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    users: undefined,
  }

  renderUser = user => <UserListItem user={user} />;

  render() {
    const {
      loading, pagination, users, loadUsers,
    } = this.props;

    return (
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
    );
  }
}

export default UsersList;
