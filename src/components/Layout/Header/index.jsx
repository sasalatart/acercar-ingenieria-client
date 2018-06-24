import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import Radium from 'radium';
import LoadingBar from 'react-redux-loading-bar';
import AvatarWithNotifications from '../../Users/Profile/AvatarWithNotifications';
import LocaleSelect from './LocaleSelect';
import HeaderLink from './Link';
import Hideable from '../Hideable';
import HideableButton from '../../HideableButton';
import Spaced from '../Spaced';
import { userShape } from '../../../shapes';
import routes from '../../../lib/routes';
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
    textDecoration: 'none',
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

function renderLoggedInButtons(currentUser, avatarProps, signOut, t) {
  return (
    <div>
      <AvatarWithNotifications currentUser={currentUser} {...avatarProps} style={styles.avatar} />
      <HideableButton type="danger" icon="logout" onClick={signOut} style={styles.button} size="small">
        {t({ id: 'sessions.signOut' })}
      </HideableButton>
    </div>
  );
}

function renderLoggedOutButtons(t) {
  return (
    <div>
      <HideableButton type="primary" icon="login" to={routes.signIn} style={styles.button}>
        {t({ id: 'sessions.signIn' })}
      </HideableButton>
      <HideableButton type="default" icon="rocket" to={routes.signUp} style={styles.button} ghost>
        {t({ id: 'sessions.signUp' })}
      </HideableButton>
    </div>
  );
}

function renderUpperHeader(currentUser, avatarProps, localeProps, signOut, t) {
  return (
    <Spaced style={styles.upperHeader} padded>
      <Link to={routes.landing} href={routes.landing} style={styles.innerUpperHeader}>
        <img src={logo} alt="logo" style={styles.logo} />
        <Hideable>
          <Fragment>
            <h1 style={styles.titleText}>Acercar</h1>
            <h1 style={styles.titleText}>Ingeniería</h1>
          </Fragment>
        </Hideable>
      </Link>
      <div style={styles.innerUpperHeader}>
        {currentUser
          ? renderLoggedInButtons(currentUser, avatarProps, signOut, t)
          : renderLoggedOutButtons(t)
        }
        <LocaleSelect {...localeProps} style={styles.localeSelect} />
      </div>
    </Spaced>
  );
}

function renderLowerHeader(currentUser, t) {
  return (
    <Spaced style={styles.lowerHeader} padded>
      <HeaderLink
        to={routes.majors}
        text="Majors"
        icon="pushpin"
      />
      <HeaderLink
        to={routes.questions()}
        text="FAQs"
        icon="question-circle"
      />
      {currentUser &&
        <HeaderLink
          to={routes.articles()}
          text={t({ id: 'articles' })}
          icon="file-text"
        />
      }
      {currentUser &&
        <HeaderLink
          to={routes.discussions}
          text={t({ id: 'discussions' })}
          icon="message"
        />
      }
      {currentUser && currentUser.admin &&
        <HeaderLink
          to={routes.users}
          text={t({ id: 'users' })}
          icon="team"
        />
      }
      <HeaderLink
        to={routes.aboutUs}
        text={t({ id: 'aboutUs' })}
        icon="smile"
      />
    </Spaced>
  );
}

function Header({
  currentUser,
  locale,
  notificationsCount,
  setLocale,
  loadNotificationsCount,
  setNotificationsCount,
  signOut,
  intl: { formatMessage: t },
}) {
  const localeProps = { locale, setLocale };
  const avatarProps = { notificationsCount, loadNotificationsCount, setNotificationsCount };

  return (
    <Fragment>
      {renderUpperHeader(currentUser, avatarProps, localeProps, signOut, t)}
      {renderLowerHeader(currentUser, t)}
      <LoadingBar style={styles.loadingBar} />
    </Fragment>
  );
}

Header.propTypes = {
  currentUser: userShape,
  locale: PropTypes.string.isRequired,
  notificationsCount: PropTypes.number.isRequired,
  setLocale: PropTypes.func.isRequired,
  loadNotificationsCount: PropTypes.func.isRequired,
  setNotificationsCount: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

Header.defaultProps = {
  currentUser: undefined,
};

export default Radium(Header);
