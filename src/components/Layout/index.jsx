import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import Spaced from './Spaced';
import { colors } from '../../theme';

const styles = {
  background: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.secondaryLight,
    minHeight: '100vh',
  },
  body: {
    flex: 1,
    position: 'relative',
  },
};

function AILayout({ children }) {
  return (
    <div style={styles.background}>
      <Header />
      <Spaced style={styles.body}>
        {children}
      </Spaced>
      <Footer />
    </div>
  );
}

AILayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AILayout;
