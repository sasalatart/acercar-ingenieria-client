import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../lib/routes';

function CommentLink({
  id,
  baseResourceName,
  baseResourceId,
  children,
}) {
  const href = routes.comment(id, baseResourceName, baseResourceId);
  return <Link to={href} href={href}>{children}</Link>;
}

CommentLink.propTypes = {
  id: PropTypes.number.isRequired,
  baseResourceName: PropTypes.string,
  baseResourceId: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

CommentLink.defaultProps = {
  baseResourceName: undefined,
  baseResourceId: undefined,
};

export default CommentLink;
