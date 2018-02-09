import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

function Articles({ intl }) {
  return <h1>{intl.formatMessage({ id: 'routing.articles' })}</h1>;
}

Articles.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Articles);
