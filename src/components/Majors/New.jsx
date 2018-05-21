import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Form from '../../containers/Majors/Form';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';

function NewMajor({ intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar />
      <Title>{t({ id: 'majors.new' })}</Title>

      <Form />
    </Fragment>
  );
}

NewMajor.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NewMajor);
