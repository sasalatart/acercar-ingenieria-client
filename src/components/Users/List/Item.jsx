import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import DestroyButton from '../../../containers/DestroyButton';
import ProfileAvatar from '../../Users/Profile/Avatar';
import ProfileLink from '../../Users/Profile/Link';
import { userShape } from '../../../shapes';

const { Item } = List;
const { Meta } = Item;

function UserListItem({
  admin, adminOrMajorAdmin, user, setSelectedUser, intl: { formatMessage: t },
}) {
  const avatar = <ProfileAvatar user={user} />;
  const title = <ProfileLink id={user.id}>{user.firstName} {user.lastName}</ProfileLink>;

  const actions = [];
  if (admin) {
    const iconType = user.admin || user.adminOfMajors.length
      ? 'star'
      : 'star-o';

    actions.push(<Icon type={iconType} onClick={setSelectedUser} />);
  }

  if (adminOrMajorAdmin) {
    const destroyButton = (
      <DestroyButton
        collection="users"
        id={user.id}
        warningMessage={t({ id: 'users.destroyWarning' })}
        textToFill={`${user.firstName} ${user.lastName}`}
        important
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
