import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import humps from 'humps';
import ProfileLink from '../../Users/Profile/Link';
import { userSummaryShape } from '../../../shapes';

function ActionText({
  user: { id, firstName, lastName },
  actionType,
}) {
  return (
    <FormattedMessage
      id={`notifications.actions.has${humps.pascalize(actionType)}`}
      values={{
        userName: <ProfileLink id={id}>{firstName} {lastName}</ProfileLink>,
      }}
    />
  );
}

ActionText.propTypes = {
  user: userSummaryShape.isRequired,
  actionType: PropTypes.string.isRequired,
};

export default ActionText;
