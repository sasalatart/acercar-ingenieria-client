import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { intlShape } from 'react-intl';
import {
  Layout,
  Menu,
  Icon,
  Badge,
} from 'antd';
import { userShape } from '../../../shapes';
import ProfileInfo from './Info';
import Notifications from './Notifications';
import ProfileEdit from './Edit';
import ChangePassword from './ChangePassword';
import DataPlaceholder from '../../DataPlaceholder';
import Hideable from '../../Layout/Hideable';
import { getProfilePaths } from '../../../routes';
import { themeStyles } from '../../../theme';

const { Sider, Content } = Layout;

const { Item } = Menu;

const styles = {
  layout: themeStyles.innerLayout,
  sider: themeStyles.innerSider,
  content: themeStyles.innerContent,
  menuItemExtra: {
    marginLeft: '10px',
  },
};

class Profile extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    user: userShape,
    mine: PropTypes.bool,
    notificationsCount: PropTypes.number.isRequired,
    activeMenuKey: PropTypes.string.isRequired,
    loadUser: PropTypes.func.isRequired,
    replaceRoute: PropTypes.func.isRequired,
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

  getMenus() {
    const { intl: { formatMessage: t } } = this.props;

    return {
      info: {
        key: this.profileKeys.info,
        icon: 'user',
        text: t({ id: 'profile.info' }),
      },
      notifications: {
        key: this.profileKeys.notifications,
        icon: 'notification',
        text: t({ id: 'profile.notifications' }),
      },
      edit: {
        key: this.profileKeys.edit,
        icon: 'edit',
        text: t({ id: 'profile.edit' }),
      },
      password: {
        key: this.profileKeys.password,
        icon: 'lock',
        text: t({ id: 'profile.changePassword' }),
      },
    };
  }

  profileKeys = getProfilePaths().keys;

  renderMenuItem = ({ key, icon, text }, extra) => (
    <Item key={key}>
      <Icon type={icon} />
      <span>{text}</span>
      {extra && <Hideable style={styles.menuItemExtra}>{extra}</Hideable>}
    </Item>
  )

  render() {
    const {
      loading,
      noData,
      user,
      mine,
      notificationsCount,
      activeMenuKey,
      replaceRoute,
    } = this.props;

    if (loading || noData) return <DataPlaceholder noData={noData} absolute />;

    if (!mine) {
      return <ProfileInfo user={user} />;
    }

    const menus = this.getMenus();

    return (
      <Layout style={styles.layout}>
        <Sider breakpoint="sm" collapsedWidth="50" style={styles.sider}>
          <Menu selectedKeys={[activeMenuKey]} onClick={({ key }) => replaceRoute(key)}>
            {this.renderMenuItem(menus.info)}
            {this.renderMenuItem(menus.notifications, <Badge count={notificationsCount} />)}
            {this.renderMenuItem(menus.edit)}
            {this.renderMenuItem(menus.password)}
          </Menu>
        </Sider>

        <Content style={styles.content}>
          <Switch>
            <Route path={this.profileKeys.password} component={ChangePassword} />
            <Route path={this.profileKeys.edit} component={ProfileEdit} />
            <Route path={`${this.profileKeys.notifications}/:seen?`} component={Notifications} />
            <Route path={this.profileKeys.info} render={() => <ProfileInfo user={user} />} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default Profile;
