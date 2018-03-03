import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import EmailForm from '../../../containers/Major/Email/Form';

function Email({ majorId, intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{t({ id: 'emails.send' })}</h1>
      <EmailForm majorId={majorId} />
    </div>
  );
}

Email.propTypes = {
  majorId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Email);
