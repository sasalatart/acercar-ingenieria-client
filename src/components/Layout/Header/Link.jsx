import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';
import Radium from 'radium';
import { Icon } from 'antd';
import Hideable from '../Hideable';
import { colors } from '../../../theme';

const Link = Radium(ReactRouterLink);

const styles = {
  link: {
    color: colors.primaryTextLight,
    fontSize: '1.25em',
    padding: '4px 35px',
    ':hover': {
      textShadow: '0 0 1em white',
    },
  },
  text: {
    marginLeft: '5px',
  },
};

function HeaderLink({ to, text, icon }) {
  return (
    <Link to={to} href={to} style={styles.link}>
      <Icon type={icon} />
      <Hideable>
        <span style={styles.text}>{text}</span>
      </Hideable>
    </Link>
  );
}

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

HeaderLink.defaultProps = {
  icon: 'link',
};

export default HeaderLink;
