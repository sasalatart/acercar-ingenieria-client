import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ChangePasswordForm from '../../../containers/Profile/ChangePassword/Form';
import { themeStyles } from '../../../theme';

const styles = {
  title: themeStyles.title,
};

function ChangePassword({ intl: { formatMessage: t } }) {
  return (
    <div>
      <h1 style={styles.title}>{t({ id: 'routing.changePassword' })}</h1>
      <ChangePasswordForm />
    </div>
  );
}

ChangePassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChangePassword);
