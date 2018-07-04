import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import EditForm from '../../../../containers/Users/Profile/Edit/Form';
import Title from '../../../Layout/Title';

function ProfileEdit({ intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar />
      <Title>{t({ id: 'profile.edit' })}</Title>

      <EditForm />
    </Fragment>
  );
}

ProfileEdit.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileEdit);
