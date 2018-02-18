import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../Pagination';
import ProfileAvatar from '../Profile/Avatar';
import Spinner from '../Spinner';
import { paginationShape, userShape } from '../../shapes';
import ROUTES from '../../routes';

const { Item } = List;
const { Meta } = Item;

class MajorUsers extends Component {
  static propTypes = {
    majorId: PropTypes.number.isRequired,
    pagination: paginationShape,
    majorUsers: PropTypes.arrayOf(userShape),
    loadMajorUsers: PropTypes.func.isRequired,
    addQueryToMajorPath: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorUsers: undefined,
  }

  componentWillMount() {
    const { majorId, pagination, loadMajorUsers } = this.props;
    loadMajorUsers(majorId, pagination && pagination.page);
  }

  handlePageChange = (page) => {
    const { majorId, loadMajorUsers, addQueryToMajorPath } = this.props;
    addQueryToMajorPath(majorId, { page });
    loadMajorUsers(majorId, page);
  }

  renderMajorUser = (user) => {
    const { intl: { formatMessage: t } } = this.props;

    const avatar = <ProfileAvatar user={user} />;
    const route = ROUTES.USER(user.id);
    const title = <Link to={route} href={route}>{user.firstName} {user.lastName}</Link>;

    return (
      <Item>
        <Meta
          avatar={avatar}
          title={title}
          description={t({ id: 'profile.generation' }, { year: user.generation })}
        />
      </Item>
    );
  }

  renderMajorUsers() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.majorUsers}
        renderItem={this.renderMajorUser}
      />
    );
  }

  render() {
    const { pagination, majorUsers, intl: { formatMessage: t } } = this.props;

    if (isEmpty(majorUsers)) {
      return <Spinner />;
    }

    return (
      <div>
        <h1>{t({ id: 'majors.interestedUsers' })}</h1>
        <PaginationControls
          pagination={pagination}
          onPageChange={this.handlePageChange}
        >
          {this.renderMajorUsers()}
        </PaginationControls>
      </div>
    );
  }
}

export default injectIntl(MajorUsers);
