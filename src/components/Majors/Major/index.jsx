import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Layout, Menu, Icon } from 'antd';
import {
  loggedInRoute,
  majorAdminRoute,
  questionsAdministrationRoute,
  articlesAdministrationRoute,
} from '../../../containers/Routes';
import MajorInfo from './Info';
import Edit from './Edit';
import MajorAdmins from '../../../containers/Majors/Major/Admins';
import UsersList from '../../../containers/Users/List';
import ArticlesList from '../../../containers/Articles/List';
import Questions from '../../Questions';
import CommentsSection from '../../Comments/Section';
import VideoLinks from '../../VideoLinks';
import Email from './Email';
import { majorShape } from '../../../shapes';
import { getMajorPaths } from '../../../routes';
import { themeStyles } from '../../../theme';

const { Sider, Content } = Layout;

const styles = {
  layout: themeStyles.innerLayout,
  sider: themeStyles.innerSider,
  content: themeStyles.innerContent,
};

export default class Major extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    major: majorShape.isRequired,
    activeMenuKey: PropTypes.string.isRequired,
    replaceRoute: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  getMenus() {
    const { major: { name }, intl: { formatMessage: t } } = this.props;

    return {
      info: {
        key: this.majorKeys.info,
        icon: 'info-circle',
        text: name,
      },
      videoLinks: {
        icon: 'video-camera',
        key: this.majorKeys.videoLinks,
        text: 'Videos',
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

  majorKeys = getMajorPaths(this.props.id).keys;
  majorRoutes = getMajorPaths(this.props.id).routes;

  renderMenuItem = ({ key, icon, text }) => (
    <Menu.Item key={key}>
      <Icon type={icon} />
      <span>{text}</span>
    </Menu.Item>
  )

  render() {
    const {
      loggedIn,
      adminOrMajorAdmin,
      id,
      major,
      activeMenuKey,
      replaceRoute,
    } = this.props;

    const menus = this.getMenus();

    return (
      <Layout style={styles.layout}>
        <Sider breakpoint="sm" collapsedWidth="50" style={styles.sider}>
          <Menu selectedKeys={[activeMenuKey]} onClick={({ key }) => replaceRoute(key)}>
            {this.renderMenuItem(menus.info)}
            {this.renderMenuItem(menus.videoLinks)}
            {adminOrMajorAdmin && this.renderMenuItem(menus.edit)}
            {loggedIn && this.renderMenuItem(menus.admins)}
            {loggedIn && this.renderMenuItem(menus.users)}
            {this.renderMenuItem(menus.questions)}
            {loggedIn && this.renderMenuItem(menus.articles)}
            {loggedIn && this.renderMenuItem(menus.comments)}
            {adminOrMajorAdmin && this.renderMenuItem(menus.email)}
          </Menu>
        </Sider>

        <Content style={styles.content}>
          <Switch>
            <Route
              exact
              path={this.majorRoutes.info}
              render={() => <MajorInfo major={major} />}
            />

            <Route
              exact
              path={this.majorRoutes.videoLinks}
              component={VideoLinks}
            />

            <Route
              path={this.majorRoutes.edit}
              render={majorAdminRoute(Edit, { major })}
            />

            <Route
              path={this.majorRoutes.admins}
              render={loggedInRoute(MajorAdmins, { majorId: id })}
            />

            <Route
              path={this.majorRoutes.users}
              render={loggedInRoute(UsersList, { majorId: id, withTitle: true })}
            />

            <Route
              path={`${this.majorRoutes.questions}/:pending?`}
              render={questionsAdministrationRoute(Questions)}
            />

            <Route
              path={`${this.majorRoutes.articles}/:pending?`}
              render={articlesAdministrationRoute(ArticlesList)}
            />

            <Route
              path={this.majorRoutes.comments}
              render={loggedInRoute(CommentsSection, { baseResourceName: 'majors', baseResourceId: id, withActionBar: true })}
            />

            <Route
              path={this.majorRoutes.email}
              render={majorAdminRoute(Email, { majorId: id })}
            />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
