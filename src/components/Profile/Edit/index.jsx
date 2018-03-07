import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../containers/Layout/ActionBar';
import Title from '../../Layout/Title';
import EditForm from '../../../containers/Profile/Edit/Form';

function ProfileEdit({ intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title text={t({ id: 'routing.profileEdit' })} />

      <EditForm />
    </div>
  );
}

ProfileEdit.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileEdit);
