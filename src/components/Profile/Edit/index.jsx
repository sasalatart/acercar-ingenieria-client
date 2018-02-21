import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import EditForm from '../../../containers/Profile/Edit/Form';

function ProfileEdit({ intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{t({ id: 'routing.profileEdit' })}</h1>
      <EditForm />
    </div>
  );
}

ProfileEdit.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileEdit);
