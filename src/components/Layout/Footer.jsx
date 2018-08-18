import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import IconText from '../Icons/IconText';
import { colors } from '../../theme';
import routes from '../../lib/routes';

const CONTACT_EMAIL = 'contacto@cai.cl';

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

export default function Footer() {
  return (
    <div style={styles.wrapper}>
      <a href={`mailto:${CONTACT_EMAIL}`}>
        <IconText icon="envelope" text={CONTACT_EMAIL} withPointer />
      </a>
      <div>
        <p style={styles.text}>Acercar Ingeniería</p>
        <p style={styles.text}>2014-2018</p>
      </div>
      <Link to={routes.credits} href={routes.credits}>
        <IconText icon="heart" text={<FormattedMessage id="credits" />} withPointer />
      </Link>
    </div>
  );
}
