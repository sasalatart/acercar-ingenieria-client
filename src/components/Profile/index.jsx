import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';
import { userShape } from '../../shapes';
import ProfileInfo from './Info';
import ProfileEdit from './Edit';
import ChangePassword from './ChangePassword';
import { PROFILE_TAB_NAMES as TAB_NAMES } from '../../routes';

const { TabPane } = Tabs;

class Profile extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    user: userShape,
    currentUser: userShape.isRequired,
    activeTab: PropTypes.string,
    loadUser: PropTypes.func.isRequired,
    setProfileTab: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    user: undefined,
    activeTab: undefined,
  };

  componentWillMount() {
    this.props.loadUser(this.props.userId);
  }

  render() {
    const {
      user, userId, currentUser, setProfileTab, intl: { formatMessage: t },
    } = this.props;

    if (userId !== currentUser.id) {
      return <ProfileInfo user={user} />;
    }

    return (
      <Tabs
        activeKey={this.props.activeTab || TAB_NAMES.info}
        size="large"
        tabPosition="left"
        onChange={setProfileTab}
      >
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
