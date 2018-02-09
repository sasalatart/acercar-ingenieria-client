import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import Radium from 'radium';
import { Button } from 'antd';
import ROUTES from '../../routes';
import LocaleSelect from '../../containers/LocaleSelect';
import HeaderLink from './HeaderLink';
import { colors, measures } from '../../theme';
import logo from '../../images/logo.png';

const styles = {
  upperHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: colors.primaryLight,
    minHeight: '96px',
    paddingLeft: measures.paddingHorizontal,
    paddingRight: measures.paddingHorizontal,
  },
  innerUpperHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '75px',
    margin: '10px 25px 10px 0px',
  },
  titleText: {
    color: colors.primaryTextLight,
    fontWeight: 'bold',
    margin: 0,
  },
  button: {
    marginRight: '5px',
  },
  localeSelect: {
    marginLeft: '25px',
  },
  lowerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.primaryDark,
    boxShadow: '0 0.5em 1.0em rgba(0, 0, 0, 0.6)',
    minHeight: '36px',
    paddingLeft: measures.paddingHorizontal,
    paddingRight: measures.paddingHorizontal,
    marginBottom: '25px',
  },
};

function renderUpperHeader(intl) {
  return (
    <div style={styles.upperHeader}>
      <Link to={ROUTES.LANDING} href={ROUTES.LANDING} style={styles.innerUpperHeader}>
        <img src={logo} alt="logo" style={styles.logo} />
        <div>
          <h1 style={styles.titleText}>Acercar</h1>
          <h1 style={styles.titleText}>Ingeniería</h1>
        </div>
      </Link>
      <div style={styles.innerUpperHeader}>
        <Link to={ROUTES.SIGN_IN} href={ROUTES.SIGN_IN}>
          <Button type="primary" size="large" icon="login" style={styles.button}>
            {intl.formatMessage({ id: 'routing.signIn' })}
          </Button>
        </Link>
        <Link to={ROUTES.SIGN_UP} href={ROUTES.SIGN_UP}>
          <Button size="large" icon="rocket" style={styles.button} ghost>
            {intl.formatMessage({ id: 'routing.signUp' })}
          </Button>
        </Link>
        <LocaleSelect style={styles.localeSelect} />
      </div>
    </div>
  );
}

function renderLowerHeader(intl) {
  return (
    <div style={styles.lowerHeader}>
      <HeaderLink
        to={ROUTES.MAJORS}
        text="Majors"
        icon="pushpin"
      />
      <HeaderLink
        to={ROUTES.ARTICLES}
        text={intl.formatMessage({ id: 'routing.articles' })}
        icon="file-text"
      />
      <HeaderLink
        to={ROUTES.QUESTIONS}
        text={intl.formatMessage({ id: 'routing.questions' })}
        icon="question-circle"
      />
      <HeaderLink
        to={ROUTES.ABOUT_US}
        text={intl.formatMessage({ id: 'routing.aboutUs' })}
        icon="smile"
      />
    </div>
  );
}

function Header({ intl }) {
  return (
    <div>
      {renderUpperHeader(intl)}
      {renderLowerHeader(intl)}
    </div>
  );
}

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Radium(Header));
