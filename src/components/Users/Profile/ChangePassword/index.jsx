import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Form from '../../../../containers/Users/Profile/ChangePassword/Form';
import Title from '../../../Layout/Title';

export default function ChangePassword() {
  return (
    <Fragment>
      <ActionBar />
      <Title><FormattedMessage id="sessions.changePassword" /></Title>

      <Form />
    </Fragment>
  );
}
