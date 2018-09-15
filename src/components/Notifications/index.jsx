import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import List from '../../containers/Notifications/List';
import Title from '../Layout/Title';
import ActionBar from './ActionBar';
import { matchShape } from '../../shapes';

function Notifications({ match, ...restProps }) {
  const seen = !!match.params.seen;

  return (
    <Fragment>
      <ActionBar seen={seen} {...restProps} />
      <Title>
        <FormattedMessage id={seen ? 'notifications.seen' : 'notifications.unseen'} />
      </Title>

      <List seen={seen} />
    </Fragment>
  );
}

Notifications.propTypes = {
  match: matchShape.isRequired,
};

export default withRouter(Notifications);
