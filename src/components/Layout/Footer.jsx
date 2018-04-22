import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import IconText from '../IconText';
import { colors } from '../../theme';
import ROUTES from '../../routes';

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

function Footer({ intl: { formatMessage: t } }) {
  return (
    <div style={styles.wrapper}>
      <a href={`mailto:${CONTACT_EMAIL}`}>
        <IconText type="mail" text={CONTACT_EMAIL} withPointer />
      </a>
      <div>
        <p style={styles.text}>Acercar Ingeniería</p>
        <p style={styles.text}>2014-2018</p>
      </div>
      <Link to={ROUTES.CREDITS} href={ROUTES.CREDITS}>
        <IconText type="heart" text={t({ id: 'credits' })} withPointer />
      </Link>
    </div>
  );
}

Footer.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
