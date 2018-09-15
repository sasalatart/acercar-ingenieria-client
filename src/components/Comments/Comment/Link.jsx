import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../lib/routes';

function CommentLink({
  id,
  baseCollection,
  baseId,
  children,
}) {
  const href = routes.comment(id, baseCollection, baseId);
  return <Link to={href} href={href}>{children}</Link>;
}

CommentLink.propTypes = {
  id: PropTypes.number.isRequired,
  baseCollection: PropTypes.string,
  baseId: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

CommentLink.defaultProps = {
  baseCollection: undefined,
  baseId: undefined,
};

export default CommentLink;
