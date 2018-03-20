import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Form from '../../containers/Majors/Form';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';

function NewMajor({ intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title text={t({ id: 'majors.new' })} />

      <Form />
    </div>
  );
}

NewMajor.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NewMajor);
