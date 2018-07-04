import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import List from '../../containers/Notifications/List';
import Title from '../Layout/Title';
import ActionBar from './ActionBar';
import { matchShape } from '../../shapes';

function Notifications({ match, intl: { formatMessage: t }, ...restProps }) {
  const seen = !!match.params.seen;

  return (
    <Fragment>
      <ActionBar seen={seen} {...restProps} />
      <Title>{t({ id: `notifications.${seen ? 'seen' : 'pending'}` })}</Title>

      <List seen={seen} />
    </Fragment>
  );
}

Notifications.propTypes = {
  match: matchShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withRouter(Notifications));
