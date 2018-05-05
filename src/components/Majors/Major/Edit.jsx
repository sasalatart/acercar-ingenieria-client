import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Form from '../../../containers/Majors/Form';
import ActionBar from '../../../containers/Layout/ActionBar';
import Title from '../../Layout/Title';
import { majorShape } from '../../../shapes';

function MajorEdit({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title>{t({ id: 'majors.edit' })}</Title>

      <Form major={major} />
    </div>
  );
}

MajorEdit.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorEdit);
