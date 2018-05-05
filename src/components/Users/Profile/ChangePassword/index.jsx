import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Title from '../../../Layout/Title';
import Form from '../../../../containers/Users/Profile/ChangePassword/Form';

function ChangePassword({ intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title>{t({ id: 'sessions.changePassword' })}</Title>

      <Form />
    </div>
  );
}

ChangePassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChangePassword);
