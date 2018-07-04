import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Form from '../../../../containers/Users/Profile/ChangePassword/Form';
import Title from '../../../Layout/Title';

function ChangePassword({ intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar />
      <Title>{t({ id: 'sessions.changePassword' })}</Title>

      <Form />
    </Fragment>
  );
}

ChangePassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChangePassword);
