import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Form from '../../../../containers/Majors/Major/Email/Form';
import Title from '../../../Layout/Title';

function Email({ majorId, intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar />
      <Title>{t({ id: 'emails.send' })}</Title>

      <Form majorId={majorId} />
    </Fragment>
  );
}

Email.propTypes = {
  majorId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Email);
