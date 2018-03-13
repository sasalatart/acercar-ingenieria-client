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

function renderUpperHeader(currentUser, goToSignIn, goToSignUp, signOut, t) {
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
              <Link to={ROUTES.PROFILE} href={ROUTES.PROFILE}>
                <UserAvatar user={currentUser} style={styles.button} />
              </Link>
              <Button type="danger" icon="logout" style={styles.button} onClick={signOut}>
                {t({ id: 'auth.signOut' })}
              </Button>
            </div>
          )
          : (
            <div>
              <Button type="primary" icon="login" style={styles.button} onClick={goToSignIn}>
                {t({ id: 'routing.signIn' })}
              </Button>
              <Button icon="rocket" style={styles.button} onClick={goToSignUp} ghost>
                {t({ id: 'routing.signUp' })}
              </Button>
            </div>
          )
        }
        <LocaleSelect style={styles.localeSelect} />
      </div>
    </div>
  );
}

function renderLowerHeader(currentUser, t) {
  return (
    <div style={styles.lowerHeader}>
      <HeaderLink
        to={ROUTES.MAJORS}
        text="Majors"
        icon="pushpin"
      />
      <HeaderLink
        to={ROUTES.ARTICLES()}
        text={t({ id: 'articles' })}
        icon="file-text"
      />
      <HeaderLink
        to={ROUTES.QUESTIONS()}
        text="FAQs"
        icon="question-circle"
      />
      {currentUser &&
        <HeaderLink
          to={ROUTES.DISCUSSIONS}
          text={t({ id: 'discussions' })}
          icon="message"
        />
      }
      {currentUser && currentUser.admin &&
        <HeaderLink
          to={ROUTES.USERS}
          text={t({ id: 'users' })}
          icon="team"
        />
      }
      <HeaderLink
        to={ROUTES.ABOUT_US}
        text={t({ id: 'aboutUs' })}
        icon="smile"
      />
    </div>
  );
}

function Header({
  currentUser, goToSignIn, goToSignUp, signOut, intl: { formatMessage: t },
}) {
  return (
    <div>
      {renderUpperHeader(currentUser, goToSignIn, goToSignUp, signOut, t)}
      {renderLowerHeader(currentUser, t)}
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
