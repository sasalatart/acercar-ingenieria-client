import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import { colors, measures } from '../../theme';

const styles = {
  background: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.secondaryLight,
    minHeight: '100vh',
  },
  body: {
    flex: 1,
    paddingLeft: measures.paddingHorizontal,
    paddingRight: measures.paddingHorizontal,
  },
};

function AILayout({ children }) {
  return (
    <div style={styles.background}>
      <Header />
      <div style={styles.body}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

AILayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AILayout;
