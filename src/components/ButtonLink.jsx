import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

function ButtonLink({
  type, children, goToRoute, ...extraProps
}) {
  return <Button type={type} onClick={goToRoute} {...extraProps}>{children}</Button>;
}

ButtonLink.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  goToRoute: PropTypes.func.isRequired,
};

ButtonLink.defaultProps = {
  type: 'primary',
  children: null,
};

export default ButtonLink;
