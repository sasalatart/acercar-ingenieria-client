import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../lib/routes';

function ArticleLink({ id, majorId, children }) {
  const href = routes.article(id, majorId);
  return <Link to={href} href={href}>{children}</Link>;
}

ArticleLink.propTypes = {
  id: PropTypes.number.isRequired,
  majorId: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

ArticleLink.defaultProps = {
  majorId: undefined,
};

export default ArticleLink;
