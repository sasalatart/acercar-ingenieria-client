import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import IconText from '../Icons/IconText';
import { colors } from '../../theme';
import routes from '../../lib/routes';
import logoCAi from '../../images/logo-cai-sm.png';
import logoCA from '../../images/logo-ca-sm.png';

export const CONTACT_EMAIL = 'acercaringenieria@caiuc.cl';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: colors.primaryLight,
    minHeight: '36px',
    marginTop: '25px',
    padding: '2px 0',
  },
  contactWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
      <div>
        <img src={logoCA} alt="logo-ca" />
        <img src={logoCAi} alt="logo-cai" />
      </div>

      <div style={styles.contactWrapper}>
        <p style={styles.text}>Acercar Ingeniería</p>
        <a href={`mailto:${CONTACT_EMAIL}`}>
          <IconText icon="envelope" text={CONTACT_EMAIL} withPointer hideable />
        </a>
      </div>

      <Link to={routes.credits} href={routes.credits}>
        <IconText icon="heart" text={<FormattedMessage id="credits" />} withPointer hideable />
      </Link>
    </div>
  );
}
