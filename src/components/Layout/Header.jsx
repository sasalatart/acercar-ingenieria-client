import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import Radium from 'radium';
import { Button } from 'antd';
import ROUTES from '../../routes';
import UserAvatar from '../Profile/Avatar';
import LocaleSelect from '../../containers/LocaleSelect';
import HeaderLink from './HeaderLink';
import { userShape } from '../../shapes';
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

function renderUpperHeader(currentUser, goToSignIn, goToSignUp, signOut, intl) {
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
        {currentUser
          ? (
            <div>
              <Link to={ROUTES.USER(currentUser.id)} href={ROUTES.USER(currentUser.id)}>
                <UserAvatar user={currentUser} style={styles.button} />
              </Link>
              <Button type="danger" icon="logout" style={styles.button} onClick={signOut}>
                {intl.formatMessage({ id: 'auth.signOut' })}
              </Button>
            </div>
          )
          : (
            <div>
              <Button type="primary" icon="login" style={styles.button} onClick={goToSignIn}>
                {intl.formatMessage({ id: 'routing.signIn' })}
              </Button>
              <Button icon="rocket" style={styles.button} onClick={goToSignUp} ghost>
                {intl.formatMessage({ id: 'routing.signUp' })}
              </Button>
            </div>
          )
        }
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

function Header({
  currentUser, goToSignIn, goToSignUp, signOut, intl,
}) {
  return (
    <div>
      {renderUpperHeader(currentUser, goToSignIn, goToSignUp, signOut, intl)}
      {renderLowerHeader(intl)}
    </div>
  );
}

Header.propTypes = {
  currentUser: userShape,
  goToSignIn: PropTypes.func.isRequired,
  goToSignUp: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

Header.defaultProps = {
  currentUser: undefined,
};

export default Radium(Header);
