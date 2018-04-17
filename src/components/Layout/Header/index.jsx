import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import Radium from 'radium';
import { Badge } from 'antd';
import UserAvatar from '../../Users/Profile/Avatar';
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
};

class Header extends Component {
  static propTypes = {
    currentUser: userShape,
    notificationsCount: PropTypes.number.isRequired,
    loadNotificationsCount: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    currentUser: undefined,
  };

  componentDidMount() {
    if (this.props.currentUser) this.props.loadNotificationsCount();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && !this.props.currentUser) nextProps.loadNotificationsCount();
  }

  renderLoggedInButtons() {
    const {
      currentUser,
      notificationsCount,
      signOut,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <Link to={ROUTES.PROFILE} href={ROUTES.PROFILE} style={styles.avatar}>
          <Badge count={notificationsCount}>
            <UserAvatar user={currentUser} />
          </Badge>
        </Link>
        <HideableButton type="danger" icon="logout" onClick={signOut} style={styles.button} size="small">
          {t({ id: 'sessions.signOut' })}
        </HideableButton>
      </div>
    );
  }

  renderLoggedOutButtons() {
    const { formatMessage: t } = this.props.intl;

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

  renderUpperHeader() {
    const { currentUser } = this.props;

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
            ? this.renderLoggedInButtons()
            : this.renderLoggedOutButtons()
          }
          <LocaleSelect style={styles.localeSelect} />
        </div>
      </Spaced>
    );
  }

  renderLowerHeader() {
    const { currentUser, intl: { formatMessage: t } } = this.props;

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

  render() {
    return (
      <div>
        {this.renderUpperHeader()}
        {this.renderLowerHeader()}
      </div>
    );
  }
}

export default Radium(Header);
