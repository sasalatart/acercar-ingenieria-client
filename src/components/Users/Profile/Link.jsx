import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function ProfileLink({ id, children }) {
  const href = ROUTES.USER(id);
  return <Link to={href} href={href}>{children}</Link>;
}

ProfileLink.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default ProfileLink;
