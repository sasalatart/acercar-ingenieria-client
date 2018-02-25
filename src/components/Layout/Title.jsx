import React from 'react';
import PropTypes from 'prop-types';
import { themeStyles } from '../../theme';

const styles = {
  title: themeStyles.title,
};

function Title({ text }) {
  return <h1 style={styles.title}>{text}</h1>;
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
