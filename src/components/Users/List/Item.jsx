import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import ImportantDestroyButton from '../../../containers/Users/DestroyButton';
import ProfileAvatar from '../../Profile/Avatar';
import ROUTES from '../../../routes';
import { userShape } from '../../../shapes';

const { Item } = List;
const { Meta } = Item;

function UserListItem({
  admin, adminOrMajorAdmin, user, setSelectedUser, intl: { formatMessage: t },
}) {
  const avatar = <ProfileAvatar user={user} />;

  const route = ROUTES.USER(user.id);
  const title = <Link to={route} href={route}>{user.firstName} {user.lastName}</Link>;

  const actions = [];
  if (admin) {
    const iconType = user.admin || user.adminOfMajors.length
      ? 'star'
      : 'star-o';

    actions.push(<Icon type={iconType} onClick={setSelectedUser} />);
  }

  if (adminOrMajorAdmin) {
    const destroyButton = (
      <ImportantDestroyButton
        id={user.id}
        warningMessage={t({ id: 'users.destroyWarning' })}
        textToFill={`${user.firstName} ${user.lastName}`}
        iconOnly
      />
    );
    actions.push(destroyButton);
  }

  return (
    <Item actions={actions}>
      <Meta
        avatar={avatar}
        title={title}
        description={t({ id: 'profile.generation' }, { year: user.generation })}
      />
    </Item>
  );
}

UserListItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  user: userShape.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default UserListItem;
