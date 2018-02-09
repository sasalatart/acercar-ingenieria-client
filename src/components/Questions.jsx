import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

function Questions({ intl }) {
  return <h1>{intl.formatMessage({ id: 'routing.questions' })}</h1>;
}

Questions.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Questions);
