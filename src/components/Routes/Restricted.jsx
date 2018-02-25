import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import RedirectToLanding from '../Routes/RedirectToLanding';

function Restricted({ component: Component, restrictedCondition, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (restrictedCondition ? <Component {...rest} /> : <RedirectToLanding />)}
    />
  );
}

Restricted.propTypes = {
  component: PropTypes.func.isRequired,
  restrictedCondition: PropTypes.bool,
};

Restricted.defaultProps = {
  restrictedCondition: false,
};

export default Restricted;
