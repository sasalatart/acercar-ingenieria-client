import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import Form from '../../../../containers/Majors/Major/Email/Form';
import Title from '../../../Layout/Title';

function Email({ majorId }) {
  return (
    <Fragment>
      <ActionBar />
      <Title><FormattedMessage id="emails.send" /></Title>

      <Form majorId={majorId} />
    </Fragment>
  );
}

Email.propTypes = {
  majorId: PropTypes.number.isRequired,
};

export default Email;
