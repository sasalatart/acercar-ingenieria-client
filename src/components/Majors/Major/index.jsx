import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Layout } from 'antd';
import {
  loggedInRoute,
  majorAdminRoute,
  questionsAdministrationRoute,
  articlesAdministrationRoute,
  articleCreationRoute,
  articleEditionRoute,
} from '../../../containers/Routes';
import Menu from '../../../containers/Layout/Menu';
import MajorAdmins from '../../../containers/Majors/Major/Admins';
import UsersList from '../../../containers/Users/List';
import ArticlesList from '../../../containers/Articles/List';
import ArticleForm from '../../../containers/Articles/Form';
import Article from '../../../containers/Articles/Article';
import Header from './Header';
import MajorInfo from './Info';
import Edit from './Edit';
import Questions from '../../Questions';
import VideoLinks from '../../VideoLinks';
import { majorShape } from '../../../shapes';
import { themeStyles } from '../../../theme';
import { getMajorPaths } from '../../../lib/routes';

const { Content } = Layout;

const styles = {
  layout: themeStyles.innerLayout,
  content: themeStyles.innerContent,
};

export default class Major extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    major: majorShape.isRequired,
  };

  getMenuItems = () => {
    const { loggedIn, major } = this.props;

    return [{
      key: this.majorKeys.info,
      icon: 'info-circle',
      text: major.name,
    }, {
      icon: 'video',
      key: this.majorKeys.videoLinks,
      text: 'Videos',
    }, {
      key: this.majorKeys.admins,
      icon: 'star',
      text: 'Admins',
      noRender: !loggedIn,
    }, {
      key: this.majorKeys.users,
      icon: 'users',
      text: <FormattedMessage id="majors.interestedUsers" />,
      noRender: !loggedIn,
    }, {
      key: this.majorKeys.questions,
      icon: 'question-circle',
      text: 'FAQs',
    }, {
      key: this.majorKeys.articles,
      icon: 'file-alt',
      text: <FormattedMessage id="majors.articles" />,
      noRender: !loggedIn,
    }];
  }

  majorKeys = getMajorPaths(this.props.major.id).keys;
  majorRoutes = getMajorPaths(this.props.major.id).routes;

  renderHeader = ({ subtitle, actions }) => {
    const { id, name } = this.props.major;
    return <Header majorId={id} majorName={name} subtitle={subtitle} actions={actions} />;
  }

  render() {
    const { major } = this.props;
    const common = { renderHeader: this.renderHeader };

    return (
      <Layout style={styles.layout}>
        <Menu items={this.getMenuItems()} />

        <Content style={styles.content}>
          <Switch>
            <Route
              exact
              path={this.majorRoutes.info}
              render={() => <MajorInfo major={major} {...common} />}
            />

            <Route
              path={this.majorRoutes.videoLinks}
              render={() => <VideoLinks {...common} />}
            />

            <Route
              path={this.majorRoutes.edit}
              render={majorAdminRoute(Edit, { major })}
            />

            <Route
              path={this.majorRoutes.admins}
              render={loggedInRoute(MajorAdmins, common)}
            />

            <Route
              path={this.majorRoutes.users}
              render={loggedInRoute(UsersList, { fromMajor: true, ...common })}
            />

            <Route
              path={`${this.majorRoutes.questions}/:unanswered?`}
              render={questionsAdministrationRoute(Questions, common)}
            />

            <Route
              path={this.majorRoutes.articleEdit}
              render={articleEditionRoute(ArticleForm)}
            />

            <Route
              path={this.majorRoutes.articlesNew}
              render={articleCreationRoute(ArticleForm)}
            />

            <Route
              path={this.majorRoutes.articlesMine}
              render={articlesAdministrationRoute(ArticlesList, { mine: true, ...common })}
            />

            <Route
              path={this.majorRoutes.articlesUnapproved}
              render={articlesAdministrationRoute(ArticlesList, { unapproved: true, ...common })}
            />

            <Route
              path={this.majorRoutes.article}
              render={loggedInRoute(Article)}
            />

            <Route
              path={this.majorRoutes.articles}
              render={articlesAdministrationRoute(ArticlesList, common)}
            />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
