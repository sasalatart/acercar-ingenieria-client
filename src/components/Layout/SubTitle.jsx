import React from 'react';
import PropTypes from 'prop-types';
import { themeStyles } from '../../theme';

const styles = {
  subTitle: themeStyles.subTitle,
};

function SubTitle({ children }) {
  return <h1 style={styles.subTitle}>{children}</h1>;
}

SubTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default SubTitle;
