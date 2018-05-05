import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Title from '../../../Layout/Title';
import EditForm from '../../../../containers/Users/Profile/Edit/Form';

function ProfileEdit({ intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title>{t({ id: 'profile.edit' })}</Title>

      <EditForm />
    </div>
  );
}

ProfileEdit.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileEdit);
