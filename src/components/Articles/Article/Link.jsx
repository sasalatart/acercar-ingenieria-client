import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function ArticleLink({ id, majorId, title }) {
  const href = ROUTES.ARTICLE(id, majorId);
  return <Link to={href} href={href}>{title}</Link>;
}

ArticleLink.propTypes = {
  id: PropTypes.number.isRequired,
  majorId: PropTypes.number,
  title: PropTypes.string.isRequired,
};

ArticleLink.defaultProps = {
  majorId: undefined,
};

export default ArticleLink;
