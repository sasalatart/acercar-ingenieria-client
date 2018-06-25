import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DestroyButton from '../../../containers/DestroyButton';
import ProfileAvatar from '../../Users/Profile/Avatar';
import ProfileLink from '../../Users/Profile/Link';
import { userShape } from '../../../shapes';
import { getCollectionParams } from '../../../lib/users';

const { Item } = List;
const { Meta } = Item;

function renderDescription(user, admin, t) {
  const descriptionPrefix = t({ id: 'profile.generation' }, { year: user.generation });

  if (!admin) return descriptionPrefix;

  return (
    <span>
      {descriptionPrefix}{', '}
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </span>
  );
}

function UserListItem({
  admin,
  adminOrMajorAdmin,
  user,
  majorId,
  setSelectedUser,
  intl: { formatMessage: t },
}) {
  const actions = [];
  if (admin) {
    const iconType = user.admin || user.adminOfMajors.length ? 'fas' : 'far';
    actions.push(<FontAwesomeIcon icon={[iconType, 'star']} onClick={setSelectedUser} />);
  }

  if (adminOrMajorAdmin) {
    const destroyButton = (
      <DestroyButton
        {...getCollectionParams(majorId, { id: user.id })}
        warningMessage={t({ id: 'users.destroyWarning' })}
        textToFill={`${user.firstName} ${user.lastName}`}
        important
        iconOnly
      />
    );
    actions.push(destroyButton);
  }

  const avatar = <ProfileAvatar user={user} />;
  const title = <ProfileLink id={user.id}>{user.firstName} {user.lastName}</ProfileLink>;
  const description = renderDescription(user, adminOrMajorAdmin, t);

  return (
    <Item actions={actions}>
      <Meta avatar={avatar} title={title} description={description} />
    </Item>
  );
}

UserListItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  user: userShape.isRequired,
  majorId: PropTypes.number,
  setSelectedUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

UserListItem.defaultProps = {
  majorId: undefined,
};

export default injectIntl(UserListItem);
