import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import EditForm from '../../containers/Major/Form';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import { majorShape } from '../../shapes';

function MajorEdit({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title text={t({ id: 'majors.edit' })} />

      <EditForm major={major} />
    </div>
  );
}

MajorEdit.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorEdit);
