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
  ]),
  goToRoute: PropTypes.func.isRequired,
};

ButtonLink.defaultProps = {
  type: 'primary',
  content: null,
};

export default ButtonLink;
