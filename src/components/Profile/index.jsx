import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';
import { userShape } from '../../shapes';
import Info from './Info';

const { TabPane } = Tabs;

class Profile extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    user: userShape,
    currentUser: userShape.isRequired,
    loadUser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    user: undefined,
  };

  componentWillMount() {
    this.props.loadUser(this.props.userId);
  }

  render() {
    const {
      user, userId, currentUser, intl: { formatMessage: t },
    } = this.props;

    if (userId !== currentUser.id) {
      return <Info user={user} />;
    }

    const tabTitles = {
      info: <span><Icon type="user" />{t({ id: 'profile.info' })}</span>,
      notifications: <span><Icon type="notification" />{t({ id: 'profile.notifications' })}</span>,
      edit: <span><Icon type="edit" />{t({ id: 'profile.edit' })}</span>,
    };

    return (
      <Tabs defaultActiveKey="1" size="large" tabPosition="left">
        <TabPane tab={tabTitles.info} key="1">
          <Info user={currentUser} />
        </TabPane>
        <TabPane tab={tabTitles.notifications} key="2">
          {t({ id: 'profile.notifications' })}
        </TabPane>
        <TabPane tab={tabTitles.edit} key="3">
          {t({ id: 'profile.edit' })}
        </TabPane>
      </Tabs>
    );
  }
}

export default Profile;
