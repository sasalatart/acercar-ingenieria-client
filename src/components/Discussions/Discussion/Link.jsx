import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../lib/routes';

function DiscussionLink({ id, children }) {
  const href = routes.discussion(id);
  return <Link to={href} href={href}>{children}</Link>;
}

DiscussionLink.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default DiscussionLink;
