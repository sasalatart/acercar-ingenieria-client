import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import EditForm from '../../../../containers/Users/Profile/Edit/Form';
import Title from '../../../Layout/Title';

export default function ProfileEdit() {
  return (
    <Fragment>
      <ActionBar />
      <Title><FormattedMessage id="profile.edit" /></Title>

      <EditForm />
    </Fragment>
  );
}
