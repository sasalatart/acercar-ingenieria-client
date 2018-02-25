import React from 'react';
import PropTypes from 'prop-types';
import { themeStyles } from '../../theme';

const styles = {
  subTitle: themeStyles.subTitle,
};

function SubTitle({ text }) {
  return <h1 style={styles.subTitle}>{text}</h1>;
}

SubTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubTitle;
