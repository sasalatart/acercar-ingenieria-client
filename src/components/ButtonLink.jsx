import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

function ButtonLink({ goToRoute, children, ...restProps }) {
  return <Button {...restProps} onClick={goToRoute}>{children}</Button>;
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
