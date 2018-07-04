import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Layout, Badge } from 'antd';
import Menu from '../../../containers/Layout/Menu';
import Notifications from '../../../containers/Notifications';
import DataPlaceholder from '../../Layout/DataPlaceholder';
import Hideable from '../../Layout/Hideable';
import ProfileInfo from './Info';
import ProfileEdit from './Edit';
import ChangePassword from './ChangePassword';
import { userShape } from '../../../shapes';
import { themeStyles } from '../../../theme';
import routes from '../../../lib/routes';

const { Content } = Layout;

const styles = {
  layout: themeStyles.innerLayout,
  content: themeStyles.innerContent,
  extra: {
    marginLeft: '10px',
  },
};

export default class Profile extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    user: userShape,
    mine: PropTypes.bool,
    notificationsCount: PropTypes.number.isRequired,
    loadUser: PropTypes.func.isRequired,
    goToLanding: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    user: undefined,
    mine: false,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.loadUser();
    }
  }

  getMenuItems = () => {
    const { notificationsCount, intl: { formatMessage: t } } = this.props;

    return [{
      key: routes.profile,
      icon: 'user',
      text: t({ id: 'profile.info' }),
    }, {
      key: routes.profileNotifications(),
      icon: 'bullhorn',
      text: t({ id: 'profile.notifications' }),
      extra: (
        <Hideable style={styles.extra}>
          <Badge count={notificationsCount} />
        </Hideable>
      ),
    }, {
      key: routes.profileEdit,
      icon: 'edit',
      text: t({ id: 'profile.edit' }),
    }, {
      key: routes.profilePassword,
      icon: 'lock',
      text: t({ id: 'profile.changePassword' }),
    }];
  }

  renderProfileInfo = () => {
    const { user, mine, goToLanding } = this.props;
    return <ProfileInfo user={user} isOwner={mine} goToLanding={goToLanding} />;
  }

  render() {
    const { loading, noData, mine } = this.props;

    if (loading || noData) return <DataPlaceholder noData={noData} absolute />;

    if (!mine) {
      return this.renderProfileInfo();
    }

    return (
      <Layout style={styles.layout}>
        <Menu items={this.getMenuItems()} />

        <Content style={styles.content}>
          <Switch>
            <Route exact path={routes.profile} render={this.renderProfileInfo} />
            <Route path={`${routes.profileNotifications()}/:seen?`} component={Notifications} />
            <Route path={routes.profileEdit} component={ProfileEdit} />
            <Route path={routes.profilePassword} component={ChangePassword} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
