import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

function SignUp({ intl }) {
  return <h1>{intl.formatMessage({ id: 'routing.signUp' })}</h1>;
}

SignUp.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignUp);
