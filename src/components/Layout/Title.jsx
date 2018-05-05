import React from 'react';
import PropTypes from 'prop-types';
import { themeStyles } from '../../theme';

const styles = {
  title: themeStyles.title,
};

function Title({ children }) {
  return <h1 style={styles.title}>{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Title;
