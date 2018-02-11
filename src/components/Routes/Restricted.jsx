import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from '../../routes';

function Restricted({ component: Component, restrictedCondition, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        restrictedCondition
          ? <Component {...rest} />
          : <Redirect to={{ pathname: ROUTES.LANDING }} />)}
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
