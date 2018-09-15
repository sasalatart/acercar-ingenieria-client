import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DestroyButton from '../../../containers/DestroyButton';
import ProfileAvatar from '../../Users/Profile/Avatar';
import ProfileLink from '../../Users/Profile/Link';
import ToolTipIcon from '../../Icons/ToolTipIcon';
import { colors } from '../../../theme';
import { userShape } from '../../../shapes';
import collections from '../../../lib/collections';

const { Item } = List;
const { Meta } = Item;

const styles = {
  iconWithRole: {
    color: colors.starred,
  },
  iconWithoutRole: {
    cursor: 'default',
  },
};

function renderRoleButton(user, admin, onClick) {
  const roleNames = user.adminOfMajors.map(({ name }) => name);
  if (user.admin) roleNames.unshift('Acercar Ingeniería');

  const commonProps = {
    icon: roleNames.length ? ['fas', 'star'] : ['far', 'star'],
    onClick: admin ? onClick : undefined,
  };

  return roleNames.length
    ? (
      <ToolTipIcon
        toolTip={<FormattedMessage id="admin.of" values={{ list: roleNames.join(', ') }} />}
        iconStyle={styles.iconWithRole}
        {...commonProps}
      />
    )
    : <FontAwesomeIcon style={admin ? undefined : styles.iconWithoutRole} {...commonProps} />;
}

function renderDescription(user, admin) {
  const descriptionPrefix = <FormattedMessage id="profile.generation" values={{ year: user.generation }} />;

  if (!admin) return descriptionPrefix;

  return (
    <span>
      {descriptionPrefix}{', '}
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </span>
  );
}

function UserListItem({
  currentUserId,
  admin,
  adminOrMajorAdmin,
  user,
  setSelectedUser,
}) {
  const actions = [];

  actions.push(renderRoleButton(user, admin, setSelectedUser));

  if (adminOrMajorAdmin && user.id !== currentUserId) {
    const destroyButton = (
      <DestroyButton
        id={user.id}
        collection={collections.users}
        warningMessage={<FormattedMessage id="users.destroyWarning" />}
        textToFill={`${user.firstName} ${user.lastName}`}
        important
        iconOnly
      />
    );
    actions.push(destroyButton);
  }

  const avatar = <ProfileAvatar user={user} />;
  const title = <ProfileLink id={user.id}>{user.firstName} {user.lastName}</ProfileLink>;
  const description = renderDescription(user, adminOrMajorAdmin);

  return (
    <Item actions={actions}>
      <Meta avatar={avatar} title={title} description={description} />
    </Item>
  );
}

UserListItem.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  admin: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  user: userShape.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

export default UserListItem;
