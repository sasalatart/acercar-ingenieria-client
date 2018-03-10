import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ImportantDestroyButton from '../../../containers/Users/DestroyButton';
import ProfileAvatar from '../../Profile/Avatar';
import ROUTES from '../../../routes';
import { userShape } from '../../../shapes';

const { Item } = List;
const { Meta } = Item;

function UserListItem({ hasAdminPrivileges, user, intl: { formatMessage: t } }) {
  const avatar = <ProfileAvatar user={user} />;

  const route = ROUTES.USER(user.id);
  const title = <Link to={route} href={route}>{user.firstName} {user.lastName}</Link>;

  const actions = [];
  if (hasAdminPrivileges) {
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
  hasAdminPrivileges: PropTypes.bool.isRequired,
  user: userShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(UserListItem));
