import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

function AboutUs({ intl }) {
  return <h1>{intl.formatMessage({ id: 'routing.aboutUs' })}</h1>;
}

AboutUs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AboutUs);
