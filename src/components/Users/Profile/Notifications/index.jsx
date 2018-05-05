import React from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import List from '../../../../containers/Users/Profile/Notifications/List';
import ActionBar from './ActionBar';
import Title from '../../../Layout/Title';
import { matchShape } from '../../../../shapes';

function Notifications({ match, intl: { formatMessage: t } }) {
  const seen = !!match.params.seen;

  return (
    <div>
      <ActionBar seen={seen} />
      <Title>{t({ id: `notifications.${seen ? 'seen' : 'pending'}` })}</Title>

      <List seen={seen} />
    </div>
  );
}

Notifications.propTypes = {
  match: matchShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withRouter(Notifications));
