import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DestroyButton from '../../../../containers/DestroyButton';
import ActionBar from '../../../../containers/Layout/ActionBar';
import { userShape } from '../../../../shapes';
import collections from '../../../../lib/collections';

function ProfileActionBar({
  admin,
  isOwner,
  user,
  goToLanding,
}) {
  const actions = [];

  if (admin || isOwner) {
    const commonProps = {
      warningMessage: <FormattedMessage id="users.destroyWarning" />,
      textToFill: `${user.firstName} ${user.lastName}`,
      important: true,
    };

    const destroyButton = isOwner
      ? (
        <DestroyButton
          {...commonProps}
          collection="auth"
          label={<FormattedMessage id="sessions.destroyMyAccount" />}
        />
      )
      : (
        <DestroyButton
          {...commonProps}
          collection={collections.users}
          id={user.id}
          callback={goToLanding}
        />
      );

    actions.push(destroyButton);
  }

  return <ActionBar actions={actions} />;
}

ProfileActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  user: userShape,
  goToLanding: PropTypes.func.isRequired,
};

ProfileActionBar.defaultProps = {
  user: undefined,
};

export default ProfileActionBar;
