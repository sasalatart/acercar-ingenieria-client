import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';
import keyMirror from 'keymirror';
import { userShape, locationShape } from '../../shapes';
import ProfileInfo from './Info';
import ProfileEdit from './Edit';
import ChangePassword from './ChangePassword';

const { TabPane } = Tabs;

const TAB_NAMES = keyMirror({
  info: null, notifications: null, edit: null, changePassword: null,
});

class Profile extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    user: userShape,
    currentUser: userShape.isRequired,
    loadUser: PropTypes.func.isRequired,
    changeProfileTab: PropTypes.func.isRequired,
    location: locationShape.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    user: undefined,
  };

  componentWillMount() {
    this.props.loadUser(this.props.userId);
  }

  getActiveTab() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    const activeTab = urlSearchParams.get('tab');
    return TAB_NAMES[activeTab] || TAB_NAMES.Info;
  }

  handleTabChange = (key) => {
    this.props.changeProfileTab(key);
  }

  render() {
    const {
      user, userId, currentUser, intl: { formatMessage: t },
    } = this.props;

    if (userId !== currentUser.id) {
      return <ProfileInfo user={user} />;
    }

    return (
      <Tabs defaultActiveKey={this.getActiveTab()} size="large" tabPosition="left" onChange={this.handleTabChange}>
        <TabPane
          key={TAB_NAMES.info}
          tab={<span><Icon type="user" />{t({ id: 'profile.info' })}</span>}
        >
          <ProfileInfo user={currentUser} />
        </TabPane>

        <TabPane
          key={TAB_NAMES.notifications}
          tab={<span><Icon type="notification" />{t({ id: 'profile.notifications' })}</span>}
        >
          {t({ id: 'profile.notifications' })}
        </TabPane>

        <TabPane
          key={TAB_NAMES.edit}
          tab={<span><Icon type="edit" />{t({ id: 'profile.edit' })}</span>}
        >
          <ProfileEdit currentUser={currentUser} />
        </TabPane>

        <TabPane
          key={TAB_NAMES.changePassword}
          tab={<span><Icon type="lock" />{t({ id: 'profile.changePassword' })}</span>}
        >
          <ChangePassword />
        </TabPane>
      </Tabs>
    );
  }
}

export default Profile;
