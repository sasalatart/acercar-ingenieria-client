import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

function ButtonLink({
  type, content, goToRoute, ...extraProps
}) {
  return <Button type={type} onClick={goToRoute} {...extraProps}>{content}</Button>;
}

ButtonLink.propTypes = {
  type: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  goToRoute: PropTypes.func.isRequired,
};

ButtonLink.defaultProps = {
  type: 'primary',
};

export default ButtonLink;
