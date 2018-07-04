import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../containers/Layout/ActionBar';
import Form from '../../../containers/Majors/Form';
import Title from '../../Layout/Title';
import { majorShape } from '../../../shapes';

function MajorEdit({ major, intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar />
      <Title>{t({ id: 'majors.edit' })}</Title>

      <Form major={major} />
    </Fragment>
  );
}

MajorEdit.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorEdit);
