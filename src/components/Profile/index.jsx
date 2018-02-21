import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Layout, Menu, Icon } from 'antd';
import { userShape } from '../../shapes';
import ProfileInfo from './Info';
import ProfileEdit from './Edit';
import ChangePassword from './ChangePassword';
import { getProfilePaths } from '../../routes';
import { themeStyles } from '../../theme';

const { Sider, Content } = Layout;

const styles = {
  layout: themeStyles.innerLayout,
  sider: themeStyles.innerSider,
  content: themeStyles.innerContent,
};

class Profile extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    user: userShape,
    currentUser: userShape.isRequired,
    activeMenuKey: PropTypes.string.isRequired,
    loadUser: PropTypes.func.isRequired,
    replaceRoute: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    user: undefined,
  };

  componentWillMount() {
    this.props.loadUser(this.props.userId);
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

  renderMenuItem = ({ key, icon, text }) => (
    <Menu.Item key={key}>
      <Icon type={icon} />
      <span>{text}</span>
    </Menu.Item>
  )

  render() {
    const {
      userId, user, currentUser, activeMenuKey, replaceRoute,
    } = this.props;

    if (userId !== currentUser.id) {
      return <ProfileInfo user={user} />;
    }

    const menus = this.getMenus();

    return (
      <Layout style={styles.layout}>
        <Sider breakpoint="sm" collapsedWidth="50" style={styles.sider}>
          <Menu activeKey={activeMenuKey} onClick={({ key }) => replaceRoute(key)}>
            {this.renderMenuItem(menus.info)}
            {this.renderMenuItem(menus.notifications)}
            {this.renderMenuItem(menus.edit)}
            {this.renderMenuItem(menus.password)}
          </Menu>
        </Sider>

        <Content style={styles.content}>
          <Route
            exact
            path={this.profileKeys.info}
            render={() => <ProfileInfo user={currentUser} />}
          />

          <Route exact path={this.profileKeys.edit} component={ProfileEdit} />
          <Route exact path={this.profileKeys.password} component={ChangePassword} />
        </Content>
      </Layout>
    );
  }
}

export default Profile;
