import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

function Majors({ intl, goToLanding }) {
  return (
    <div>
      <h1>Majors</h1>
      <button onClick={goToLanding}>
        {intl.formatMessage({ id: 'routing.landing' })}
      </button>
    </div>
  );
}

Majors.propTypes = {
  // eslint-disable-next-line react/no-typos
  intl: intlShape.isRequired,
  goToLanding: PropTypes.func.isRequired,
};

export default injectIntl(Majors);
