import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';
import MajorInfo from './Info';
import EditForm from '../../containers/Major/Edit';
import MajorAdmins from '../../containers/Major/Admins';
import MajorUsers from '../../containers/Major/Users';
import AnsweredQuestions from '../../containers/Major/AnsweredQuestions';
import Spinner from '../Spinner';
import { majorShape, userShape } from '../../shapes';
import { MAJOR_TAB_NAMES as TAB_NAMES } from '../../routes';
import { themeStyles } from '../../theme';

const { TabPane } = Tabs;

const styles = {
  title: themeStyles.title,
};

function renderTabTitle(type, title) {
  return <span><Icon type={type} />{title}</span>;
}

class Major extends Component {
  static propTypes = {
    majorId: PropTypes.number.isRequired,
    major: majorShape,
    currentUser: userShape,
    activeTab: PropTypes.string,
    loadMajor: PropTypes.func.isRequired,
    setMajorTab: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    major: undefined,
    currentUser: undefined,
    activeTab: undefined,
  }

  componentWillMount() {
    const { loadMajor, majorId } = this.props;
    loadMajor(majorId);
  }

  handleTabChange = (key) => {
    this.props.setMajorTab(this.props.majorId, key);
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

        <Tabs
          activeKey={this.props.activeTab || TAB_NAMES.info}
          size="large"
          tabPosition="left"
          onChange={this.handleTabChange}
        >
          <TabPane
            key={TAB_NAMES.info}
            tab={renderTabTitle('info-circle', t({ id: 'majors.info' }))}
          >
            <MajorInfo major={major} />
          </TabPane>

          {adminPrivileges &&
            <TabPane
              key={TAB_NAMES.edit}
              tab={renderTabTitle('edit', t({ id: 'majors.edit' }))}
            >
              <EditForm major={major} />
            </TabPane>
          }

          {currentUser &&
            <TabPane
              key={TAB_NAMES.admins}
              tab={renderTabTitle('star-o', t({ id: 'majors.admins' }))}
            >
              <MajorAdmins />
            </TabPane>
          }

          {currentUser &&
            <TabPane
              key={TAB_NAMES.interestedUsers}
              tab={renderTabTitle('team', t({ id: 'majors.interestedUsers' }))}
            >
              <MajorUsers />
            </TabPane>
          }

          <TabPane
            key={TAB_NAMES.questions}
            tab={renderTabTitle('question-circle', t({ id: 'majors.questions' }))}
          >
            <AnsweredQuestions />
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
