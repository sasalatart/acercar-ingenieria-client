import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

function SignIn({ intl }) {
  return <h1>{intl.formatMessage({ id: 'routing.signIn' })}</h1>;
}

SignIn.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignIn);
