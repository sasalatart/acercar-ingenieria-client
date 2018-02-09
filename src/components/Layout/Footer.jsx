import React from 'react';
import { colors, measures } from '../../theme';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: colors.primaryLight,
    minHeight: '36px',
    paddingLeft: measures.paddingHorizontal,
    paddingRight: measures.paddingHorizontal,
  },
  text: {
    color: colors.primaryTextLight,
    margin: 0,
    textAlign: 'center',
  },
};

function Footer() {
  return (
    <div style={styles.wrapper}>
      <div>
        <p style={styles.text}>Acercar Ingeniería</p>
        <p style={styles.text}>2014-2018</p>
      </div>
    </div>
  );
}

export default Footer;
