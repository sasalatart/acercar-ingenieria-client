import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function DiscussionLink({ id, title }) {
  const href = ROUTES.DISCUSSION(id);
  return <Link to={href} href={href}>{title}</Link>;
}

DiscussionLink.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default DiscussionLink;
