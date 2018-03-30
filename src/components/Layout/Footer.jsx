import React from 'react';
import Spaced from './Spaced';
import { colors } from '../../theme';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: colors.primaryLight,
    minHeight: '36px',
    marginTop: '25px',
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
      <Spaced padded>
        <p style={styles.text}>Acercar Ingeniería</p>
        <p style={styles.text}>2014-2018</p>
      </Spaced>
    </div>
  );
}

export default Footer;
