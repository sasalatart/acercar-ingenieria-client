import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function ArticleLink({ id, majorId, children }) {
  const href = ROUTES.ARTICLE(id, majorId);
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
