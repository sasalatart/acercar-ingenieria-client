import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import Radium from 'radium';
import { Button } from 'antd';
import UserAvatar from '../../Users/Profile/Avatar';
import LocaleSelect from '../../../containers/Layout/Header/LocaleSelect';
import ButtonLink from '../../../containers/ButtonLink';
import HeaderLink from './Link';
import Hideable from '../Hideable';
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
};

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
          ? (
            <div>
              <Link to={ROUTES.PROFILE} href={ROUTES.PROFILE}>
                <UserAvatar user={currentUser} style={styles.button} />
              </Link>
              <Button type="danger" icon="logout" onClick={signOut} style={styles.button}>
                <Hideable>{t({ id: 'sessions.signOut' })}</Hideable>
              </Button>
            </div>
          )
          : (
            <div>
              <ButtonLink type="primary" icon="login" to={ROUTES.SIGN_IN} style={styles.button}>
                <Hideable>{t({ id: 'sessions.signIn' })}</Hideable>
              </ButtonLink>
              <ButtonLink icon="rocket" to={ROUTES.SIGN_UP} style={styles.button} ghost>
                <Hideable>{t({ id: 'sessions.signUp' })}</Hideable>
              </ButtonLink>
            </div>
          )
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
    </Spaced>
  );
}

function Header({ currentUser, signOut, intl: { formatMessage: t } }) {
  return (
    <div>
      {renderUpperHeader(currentUser, signOut, t)}
      {renderLowerHeader(currentUser, t)}
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
