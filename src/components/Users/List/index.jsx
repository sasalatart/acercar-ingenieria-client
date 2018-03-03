import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import UserListItem from './Item';
import { paginationShape, userShape } from '../../../shapes';

class UsersList extends Component {
  static propTypes = {
    majorId: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    users: ImmutablePropTypes.setOf(userShape),
    loadUsers: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    pagination: undefined,
    users: undefined,
  }

  renderMajorUser = user => <UserListItem user={user} />;

  render() {
    const {
      loading, majorId, pagination, users, loadUsers, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <h1>{majorId ? t({ id: 'majors.interestedUsers' }) : t({ id: 'users' })}</h1>
        <PaginationControls
          pagination={pagination}
          loading={loading}
          loadFn={loadUsers}
          render={() => (
            <List
              itemLayout="horizontal"
              dataSource={users.toJS()}
              renderItem={this.renderMajorUser}
            />
          )}
        />
      </div>
    );
  }
}

export default injectIntl(UsersList);
