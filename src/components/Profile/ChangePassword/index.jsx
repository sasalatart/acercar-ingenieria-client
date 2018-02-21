import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ChangePasswordForm from '../../../containers/Profile/ChangePassword/Form';

function ChangePassword({ intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{t({ id: 'routing.changePassword' })}</h1>
      <ChangePasswordForm />
    </div>
  );
}

ChangePassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChangePassword);
