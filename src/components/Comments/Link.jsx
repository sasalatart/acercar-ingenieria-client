import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import lowerFirst from 'lodash/lowerFirst';
import ROUTES from '../../routes';

function CommentsLink({
  commentableId,
  commentableType,
  children,
}) {
  const baseResourceName = `${lowerFirst(commentableType)}s`;
  const href = ROUTES.COMMENT(baseResourceName, commentableId);
  return <Link to={href} href={href}>{children}</Link>;
}

CommentsLink.propTypes = {
  commentableId: PropTypes.number.isRequired,
  commentableType: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default CommentsLink;
