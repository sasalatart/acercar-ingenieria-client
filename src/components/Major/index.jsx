import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';
import keyMirror from 'keymirror';
import Spinner from '../Spinner';
import { majorShape, userShape } from '../../shapes';
import { themeStyles } from '../../theme';

const { TabPane } = Tabs;

const styles = {
  title: themeStyles.title,
};

export const TAB_NAMES = keyMirror({
  info: null,
  edit: null,
  admins: null,
  interestedUsers: null,
  questions: null,
  pendingQuestions: null,
  articles: null,
  comments: null,
  email: null,
});

function renderTabTitle(type, title) {
  return <span><Icon type={type} />{title}</span>;
}

class Major extends Component {
  static propTypes = {
    majorId: PropTypes.number.isRequired,
    major: majorShape,
    currentUser: userShape.isRequired,
    activeTab: PropTypes.string.isRequired,
    loadMajor: PropTypes.func.isRequired,
    changeMajorTab: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    major: undefined,
  }

  componentWillMount() {
    const { loadMajor, majorId } = this.props;
    loadMajor(majorId);
  }

  handleTabChange = (key) => {
    this.props.changeMajorTab(this.props.majorId, key);
  }

  render() {
    const { major, currentUser, intl: { formatMessage: t } } = this.props;

    if (!major) {
      return <Spinner />;
    }

    const adminPrivileges = currentUser
      && (currentUser.admin || currentUser.adminOfMajors.includes(major.id));

    return (
      <div>
        <h1 style={styles.title}>{major.name}</h1>

        <Tabs defaultActiveKey={this.props.activeTab} size="large" tabPosition="left" onChange={this.handleTabChange}>
          <TabPane
            key={TAB_NAMES.info}
            tab={renderTabTitle('info-circle', t({ id: 'majors.info' }))}
          >
            {t({ id: 'majors.info' })}
          </TabPane>

          {adminPrivileges &&
            <TabPane
              key={TAB_NAMES.edit}
              tab={renderTabTitle('edit', t({ id: 'majors.edit' }))}
            >
              {t({ id: 'majors.edit' })}
            </TabPane>
          }

          {currentUser &&
            <TabPane
              key={TAB_NAMES.admins}
              tab={renderTabTitle('star-o', t({ id: 'majors.admins' }))}
            >
              {t({ id: 'majors.admins' })}
            </TabPane>
          }

          {currentUser &&
            <TabPane
              key={TAB_NAMES.interestedUsers}
              tab={renderTabTitle('team', t({ id: 'majors.interestedUsers' }))}
            >
              {t({ id: 'majors.interestedUsers' })}
            </TabPane>
          }

          <TabPane
            key={TAB_NAMES.questions}
            tab={renderTabTitle('question-circle', t({ id: 'majors.questions' }))}
          >
            {t({ id: 'majors.questions' })}
          </TabPane>

          {adminPrivileges &&
            <TabPane
              key={TAB_NAMES.pendingQuestions}
              tab={renderTabTitle('question-circle-o', t({ id: 'majors.pendingQuestions' }))}
            >
              {t({ id: 'majors.pendingQuestions' })}
            </TabPane>
          }

          <TabPane
            key={TAB_NAMES.articles}
            tab={renderTabTitle('file-text', t({ id: 'majors.articles' }))}
          >
            {t({ id: 'majors.articles' })}
          </TabPane>

          {currentUser &&
            <TabPane
              key={TAB_NAMES.comments}
              tab={renderTabTitle('message', t({ id: 'majors.comments' }))}
            >
              {t({ id: 'majors.comments' })}
            </TabPane>
          }

          {adminPrivileges &&
            <TabPane
              key={TAB_NAMES.email}
              tab={renderTabTitle('mail', t({ id: 'majors.email' }))}
            >
              {t({ id: 'majors.email' })}
            </TabPane>
          }
        </Tabs>
      </div>
    );
  }
}

export default Major;
