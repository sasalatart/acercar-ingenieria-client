import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Layout, Menu, Icon } from 'antd';
import QuestionsPrivilegesRoute from '../../containers/Routes/QuestionsPrivileges';
import MajorInfo from './Info';
import Edit from './Edit';
import MajorAdmins from '../../containers/Major/Admins';
import Users from '../../containers/Users';
import Questions from '../Questions';
import Articles from '../Articles';
import Comments from '../Comments';
import Email from './Email';
import Spinner from '../Spinner';
import { majorShape } from '../../shapes';
import { getMajorPaths } from '../../routes';
import { themeStyles } from '../../theme';

const { Sider, Content } = Layout;

const styles = {
  layout: themeStyles.innerLayout,
  sider: themeStyles.innerSider,
  content: themeStyles.innerContent,
};

class Major extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    majorId: PropTypes.number.isRequired,
    major: majorShape,
    activeMenuKey: PropTypes.string.isRequired,
    loadMajor: PropTypes.func.isRequired,
    replaceRoute: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    major: undefined,
  }

  componentDidMount() {
    this.props.loadMajor(this.props.majorId);
  }

  getMenus() {
    const { major: { name }, intl: { formatMessage: t } } = this.props;

    return {
      info: {
        key: this.majorKeys.info,
        icon: 'info-circle',
        text: name,
      },
      edit: {
        key: this.majorKeys.edit,
        icon: 'edit',
        text: t({ id: 'majors.edit' }),
      },
      admins: {
        key: this.majorKeys.admins,
        icon: 'star-o',
        text: 'Admins',
      },
      users: {
        key: this.majorKeys.users,
        icon: 'team',
        text: t({ id: 'majors.interestedUsers' }),
      },
      questions: {
        key: this.majorKeys.questions,
        icon: 'question-circle',
        text: 'FAQs',
      },
      articles: {
        key: this.majorKeys.articles,
        icon: 'file-text',
        text: t({ id: 'majors.articles' }),
      },
      comments: {
        key: this.majorKeys.comments,
        icon: 'message',
        text: t({ id: 'majors.comments' }),
      },
      email: {
        key: this.majorKeys.email,
        icon: 'mail',
        text: t({ id: 'majors.email' }),
      },
    };
  }

  majorKeys = getMajorPaths(this.props.majorId).keys;
  majorRoutes = getMajorPaths(this.props.majorId).routes;

  renderMenuItem = ({ key, icon, text }) => (
    <Menu.Item key={key}>
      <Icon type={icon} />
      <span>{text}</span>
    </Menu.Item>
  )

  render() {
    const {
      loggedIn, adminOrMajorAdmin, majorId, major, activeMenuKey, replaceRoute,
    } = this.props;

    if (!major) {
      return <Spinner absolute />;
    }

    const menus = this.getMenus();

    return (
      <Layout style={styles.layout}>
        <Sider breakpoint="sm" collapsedWidth="50" style={styles.sider}>
          <Menu selectedKeys={[activeMenuKey]} onClick={({ key }) => replaceRoute(key)}>
            {this.renderMenuItem(menus.info)}
            {adminOrMajorAdmin && this.renderMenuItem(menus.edit)}
            {loggedIn && this.renderMenuItem(menus.admins)}
            {loggedIn && this.renderMenuItem(menus.users)}
            {this.renderMenuItem(menus.questions)}
            {this.renderMenuItem(menus.articles)}
            {loggedIn && this.renderMenuItem(menus.comments)}
            {adminOrMajorAdmin && this.renderMenuItem(menus.email)}
          </Menu>
        </Sider>

        <Content style={styles.content}>
          <Route
            exact
            path={this.majorRoutes.info}
            render={() => <MajorInfo major={major} />}
          />

          {adminOrMajorAdmin &&
            <Route
              exact
              path={this.majorRoutes.edit}
              render={() => <Edit major={major} />}
            />
          }

          {loggedIn &&
            <Route
              exact
              path={this.majorRoutes.admins}
              render={() => <MajorAdmins majorId={majorId} />}
            />
          }

          {loggedIn &&
            <Route
              exact
              path={this.majorRoutes.users}
              render={() => <Users majorId={majorId} />}
            />
          }

          <Route
            exact
            path={`${this.majorRoutes.questions}/:pending?`}
            render={() => <QuestionsPrivilegesRoute component={Questions} />}
          />

          <Route
            exact
            path={this.majorRoutes.articles}
            render={() => <Articles majorId={majorId} />}
          />

          {loggedIn &&
            <Route
              exact
              path={this.majorRoutes.comments}
              render={() => <Comments baseResourceName="majors" baseResourceId={majorId} withActionBar />}
            />
          }

          {adminOrMajorAdmin &&
            <Route
              exact
              path={this.majorRoutes.email}
              render={() => <Email majorId={majorId} />}
            />
          }
        </Content>
      </Layout>
    );
  }
}

export default Major;
