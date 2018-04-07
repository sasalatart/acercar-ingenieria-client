import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

function ProfileLink({ id, firstName, lastName }) {
  const href = ROUTES.USER(id);
  return <Link to={href} href={href}>{firstName} {lastName}</Link>;
}

ProfileLink.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ProfileLink;
