import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';
import LoadingBar from 'react-redux-loading-bar';
import AvatarWithNotifications from '../../Users/Profile/AvatarWithNotifications';
import LocaleSelect from './LocaleSelect';
import HeaderLink from './Link';
import ToolTipIcon from '../../Icons/ToolTipIcon';
import Hideable from '../Hideable';
import HideableButton from '../../Icons/HideableButton';
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

function renderLoggedInButtons(currentUser, avatarProps, signOut) {
  return (
    <div>
      <AvatarWithNotifications currentUser={currentUser} {...avatarProps} style={styles.avatar} />
      <ToolTipIcon
        toolTip={<FormattedMessage id="sessions.signOut" />}
        icon="sign-out-alt"
        onClick={signOut}
        type="danger"
        size="small"
        style={styles.button}
        button
      />
    </div>
  );
}

function renderLoggedOutButtons() {
  return (
    <div>
      <HideableButton type="primary" icon="sign-in-alt" to={routes.signIn} style={styles.button}>
        <FormattedMessage id="sessions.signIn" />
      </HideableButton>
      <HideableButton type="default" icon="rocket" to={routes.signUp} style={styles.button} ghost>
        <FormattedMessage id="sessions.signUp" />
      </HideableButton>
    </div>
  );
}

function renderUpperHeader(currentUser, avatarProps, localeProps, signOut) {
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
          ? renderLoggedInButtons(currentUser, avatarProps, signOut)
          : renderLoggedOutButtons()
        }
        <LocaleSelect {...localeProps} style={styles.localeSelect} />
      </div>
    </Spaced>
  );
}

function renderLowerHeader(currentUser) {
  return (
    <Spaced style={styles.lowerHeader} padded>
      <HeaderLink
        to={routes.majors}
        text="Majors"
        icon="university"
      />
      <HeaderLink
        to={routes.questions()}
        text="FAQs"
        icon="question-circle"
      />
      {currentUser &&
        <HeaderLink
          to={routes.articles()}
          text={<FormattedMessage id="articles" />}
          icon="file-alt"
        />
      }
      {currentUser &&
        <HeaderLink
          to={routes.discussions}
          text={<FormattedMessage id="discussions" />}
          icon="comments"
        />
      }
      {currentUser && currentUser.admin &&
        <HeaderLink
          to={routes.users}
          text={<FormattedMessage id="users" />}
          icon="users"
        />
      }
      <HeaderLink
        to={routes.aboutUs}
        text={<FormattedMessage id="aboutUs" />}
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
}) {
  const localeProps = { locale, setLocale };
  const avatarProps = { notificationsCount, loadNotificationsCount, setNotificationsCount };

  return (
    <Fragment>
      {renderUpperHeader(currentUser, avatarProps, localeProps, signOut)}
      {renderLowerHeader(currentUser)}
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
};

Header.defaultProps = {
  currentUser: undefined,
};

export default Radium(Header);
