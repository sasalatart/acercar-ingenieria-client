import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import ProfileAvatar from '../../Profile/Avatar';
import ROUTES from '../../../routes';
import { userShape } from '../../../shapes';

const { Item } = List;
const { Meta } = Item;

function UserListItem({ user, intl: { formatMessage: t } }) {
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

UserListItem.propTypes = {
  user: userShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserListItem);
