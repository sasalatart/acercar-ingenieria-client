import React, { PureComponent } from 'react';
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

export default class UserListItem extends PureComponent {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    admin: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    user: userShape.isRequired,
    onRoleButtonClick: PropTypes.func.isRequired,
  };

  handleRoleButtonClick = () => {
    this.props.onRoleButtonClick(this.props.user.id);
  };

  renderRoleButton() {
    const { user, admin } = this.props;

    const roleNames = user.adminOfMajors.map(({ name }) => name);
    if (user.admin) roleNames.unshift('Acercar Ingeniería');

    const commonProps = { icon: roleNames.length ? ['fas', 'star'] : ['far', 'star'] };
    if (admin) commonProps.onClick = this.handleRoleButtonClick;

    if (roleNames.length === 0) {
      const style = admin ? undefined : styles.iconWithoutRole;
      return <FontAwesomeIcon style={style} {...commonProps} />;
    }

    return (
      <ToolTipIcon
        toolTip={<FormattedMessage id="admin.of" values={{ list: roleNames.join(', ') }} />}
        iconStyle={styles.iconWithRole}
        {...commonProps}
      />
    );
  }

  renderDescription() {
    const { user, admin } = this.props;

    const descriptionPrefix = <FormattedMessage id="profile.generation" values={{ year: user.generation }} />;
    if (!admin) return descriptionPrefix;
    return (
      <span>
        {descriptionPrefix}{', '}
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </span>
    );
  }

  render() {
    const { currentUserId, adminOrMajorAdmin, user } = this.props;

    const actions = [this.renderRoleButton()];

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
    return (
      <Item actions={actions}>
        <Meta avatar={avatar} title={title} description={this.renderDescription()} />
      </Item>
    );
  }
}
