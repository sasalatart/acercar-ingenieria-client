import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import EditForm from '../../containers/Major/EditForm';
import { majorShape } from '../../shapes';

function MajorInfo({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{t({ id: 'majors.edit' })}</h1>
      <EditForm major={major} />
    </div>
  );
}

MajorInfo.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorInfo);
