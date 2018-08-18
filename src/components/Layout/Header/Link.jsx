import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';
import Radium from 'radium';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hideable from '../Hideable';
import { colors, breakpoints } from '../../../theme';

const Link = Radium(ReactRouterLink);

const styles = {
  link: {
    color: colors.primaryTextLight,
    fontSize: '1.25em',
    padding: '4px 35px',
    ':hover': {
      textShadow: '0 0 1em white',
    },
    [breakpoints.md]: {
      padding: '4px 20px',
    },
  },
  text: {
    marginLeft: '5px',
  },
};

function HeaderLink({ to, text, icon }) {
  return (
    <Link to={to} href={to} style={styles.link}>
      <FontAwesomeIcon icon={icon} />
      <Hideable>
        <span style={styles.text}>{text}</span>
      </Hideable>
    </Link>
  );
}

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default Radium(HeaderLink);
