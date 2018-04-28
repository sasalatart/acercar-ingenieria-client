import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import Radium from 'radium';
import LoadingBar from 'react-redux-loading-bar';
import AvatarWithNotifications from '../../../containers/Users/Profile/AvatarWithNotifications';
import LocaleSelect from '../../../containers/Layout/Header/LocaleSelect';
import HeaderLink from './Link';
import Hideable from '../Hideable';
import HideableButton from '../../HideableButton';
import Spaced from '../Spaced';
import { userShape } from '../../../shapes';
import ROUTES from '../../../routes';
import { colors } from '../../../theme';
import logo from '../../../images/logo.png';

const styles = {
  upperHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: colors.primaryLight,
    minHeight: '96px',
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
  avatar: {
    marginRight: '25px',
  },
  button: {
    marginRight: '5px',
  },
  localeSelect: {
    marginLeft: '5px',
  },
  lowerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.primaryDark,
    boxShadow: '0 0.5em 1.0em rgba(0, 0, 0, 0.6)',
    minHeight: '36px',
    marginBottom: '25px',
  },
  loadingBar: {
    marginTop: '-25px',
    backgroundColor: 'white',
  },
};

function renderLoggedInButtons(signOut, t) {
  return (
    <div>
      <AvatarWithNotifications style={styles.avatar} />
      <HideableButton type="danger" icon="logout" onClick={signOut} style={styles.button} size="small">
        {t({ id: 'sessions.signOut' })}
      </HideableButton>
    </div>
  );
}

function renderLoggedOutButtons(t) {
  return (
    <div>
      <HideableButton type="primary" icon="login" to={ROUTES.SIGN_IN} style={styles.button}>
        {t({ id: 'sessions.signIn' })}
      </HideableButton>
      <HideableButton type="default" icon="rocket" to={ROUTES.SIGN_UP} style={styles.button} ghost>
        {t({ id: 'sessions.signUp' })}
      </HideableButton>
    </div>
  );
}

function renderUpperHeader(currentUser, signOut, t) {
  return (
    <Spaced style={styles.upperHeader} padded>
      <Link to={ROUTES.LANDING} href={ROUTES.LANDING} style={styles.innerUpperHeader}>
        <img src={logo} alt="logo" style={styles.logo} />
        <Hideable>
          <div>
            <h1 style={styles.titleText}>Acercar</h1>
            <h1 style={styles.titleText}>Ingeniería</h1>
          </div>
        </Hideable>
      </Link>
      <div style={styles.innerUpperHeader}>
        {currentUser
          ? renderLoggedInButtons(signOut, t)
          : renderLoggedOutButtons(t)
        }
        <LocaleSelect style={styles.localeSelect} />
      </div>
    </Spaced>
  );
}

function renderLowerHeader(currentUser, t) {
  return (
    <Spaced style={styles.lowerHeader} padded>
      <HeaderLink
        to={ROUTES.MAJORS}
        text="Majors"
        icon="pushpin"
      />
      {currentUser &&
        <HeaderLink
          to={ROUTES.ARTICLES()}
          text={t({ id: 'articles' })}
          icon="file-text"
        />
      }
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
    </Spaced>
  );
}

function Header({ currentUser, signOut, intl: { formatMessage: t } }) {
  return (
    <div>
      {renderUpperHeader(currentUser, signOut, t)}
      {renderLowerHeader(currentUser, t)}
      <LoadingBar style={styles.loadingBar} />
    </div>
  );
}

Header.propTypes = {
  currentUser: userShape,
  signOut: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

Header.defaultProps = {
  currentUser: undefined,
};

export default Radium(Header);
