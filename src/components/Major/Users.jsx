import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import PaginationControls from '../Pagination';
import ProfileAvatar from '../Profile/Avatar';
import { paginationShape, userShape } from '../../shapes';
import ROUTES from '../../routes';

const { Item } = List;
const { Meta } = Item;

class MajorUsers extends Component {
  static propTypes = {
    majorId: PropTypes.number.isRequired,
    pagination: paginationShape,
    defaultPage: PropTypes.number.isRequired,
    majorUsers: ImmutablePropTypes.setOf(userShape),
    loadMajorUsers: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorUsers: undefined,
  }

  componentWillMount() {
    const { majorId, defaultPage, loadMajorUsers } = this.props;
    loadMajorUsers(majorId, defaultPage);
  }

  handlePageChange = (page) => {
    const { majorId, loadMajorUsers, addQueryToCurrentUri } = this.props;
    addQueryToCurrentUri({ page });
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

  renderMajorUsers = () => (
    <List
      itemLayout="horizontal"
      dataSource={this.props.majorUsers.toArray()}
      renderItem={this.renderMajorUser}
    />
  );

  render() {
    const { pagination, majorUsers, intl: { formatMessage: t } } = this.props;

    return (
      <div>
        <h1>{t({ id: 'majors.interestedUsers' })}</h1>
        <PaginationControls
          pagination={pagination}
          loading={!majorUsers || majorUsers.isEmpty()}
          onPageChange={this.handlePageChange}
          render={this.renderMajorUsers}
        />
      </div>
    );
  }
}

export default injectIntl(MajorUsers);
