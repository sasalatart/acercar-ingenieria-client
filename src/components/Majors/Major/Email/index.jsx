import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Title from '../../../Layout/Title';
import Form from '../../../../containers/Majors/Major/Email/Form';

function Email({ majorId, intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title text={t({ id: 'emails.send' })} />

      <Form majorId={majorId} />
    </div>
  );
}

Email.propTypes = {
  majorId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Email);
