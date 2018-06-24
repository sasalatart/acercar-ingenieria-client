import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Layout } from 'antd';
import {
  loggedInRoute,
  majorAdminRoute,
  questionsAdministrationRoute,
  articlesAdministrationRoute,
  articleCreationRoute,
  articleEditionRoute,
} from '../../../containers/Routes';
import MajorInfo from './Info';
import Edit from './Edit';
import MajorAdmins from '../../../containers/Majors/Major/Admins';
import UsersList from '../../../containers/Users/List';
import ArticlesList from '../../../containers/Articles/List';
import ArticleForm from '../../../containers/Articles/Form';
import Article from '../../../containers/Articles/Article';
import Questions from '../../Questions';
import VideoLinks from '../../VideoLinks';
import Menu from '../../../containers/Menu';
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
    id: PropTypes.number.isRequired,
    major: majorShape.isRequired,
    intl: intlShape.isRequired,
  };

  getMenuItems = () => {
    const { loggedIn, major, intl: { formatMessage: t } } = this.props;

    return [{
      key: this.majorKeys.info,
      icon: 'info-circle',
      text: major.name,
    }, {
      icon: 'video-camera',
      key: this.majorKeys.videoLinks,
      text: 'Videos',
    }, {
      key: this.majorKeys.admins,
      icon: 'star-o',
      text: 'Admins',
      noRender: !loggedIn,
    }, {
      key: this.majorKeys.users,
      icon: 'team',
      text: t({ id: 'majors.interestedUsers' }),
      noRender: !loggedIn,
    }, {
      key: this.majorKeys.questions,
      icon: 'question-circle',
      text: 'FAQs',
    }, {
      key: this.majorKeys.articles,
      icon: 'file-text',
      text: t({ id: 'majors.articles' }),
      noRender: !loggedIn,
    }];
  }

  majorKeys = getMajorPaths(this.props.id).keys;
  majorRoutes = getMajorPaths(this.props.id).routes;

  render() {
    const { loggedIn, id, major } = this.props;

    return (
      <Layout style={styles.layout}>
        <Menu items={this.getMenuItems()} />

        <Content style={styles.content}>
          <Switch>
            <Route
              exact
              path={this.majorRoutes.info}
              render={() => <MajorInfo loggedIn={loggedIn} major={major} />}
            />

            <Route
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
              path={this.majorRoutes.articleEdit}
              render={articleEditionRoute(ArticleForm)}
            />

            <Route
              path={this.majorRoutes.articlesNew}
              render={articleCreationRoute(ArticleForm)}
            />

            <Route
              path={this.majorRoutes.articlesMine}
              render={articlesAdministrationRoute(ArticlesList, { mine: true })}
            />

            <Route
              path={this.majorRoutes.articlesPending}
              render={articlesAdministrationRoute(ArticlesList, { pending: true })}
            />

            <Route
              path={this.majorRoutes.article}
              render={loggedInRoute(Article)}
            />

            <Route
              path={this.majorRoutes.articles}
              render={articlesAdministrationRoute(ArticlesList)}
            />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
