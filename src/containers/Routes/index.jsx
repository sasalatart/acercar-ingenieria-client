import React from 'react';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import Admin from './Admin';
import MajorAdmin from './MajorAdmin';
import QuestionsAdministration from './QuestionsAdministration';
import ArticleCreation from './ArticleCreation';
import ArticleAdministration from './ArticleAdministration';
import DiscussionAdministration from './DiscussionAdministration';

function routeFactory(Wrapper) {
  return (component, extraParams) =>
    props => <Wrapper {...props} {...extraParams} component={component} />;
}

export const loggedOutRoute = routeFactory(LoggedOut);

export const loggedInRoute = routeFactory(LoggedIn);

export const adminRoute = routeFactory(Admin);

export const majorAdminRoute = routeFactory(MajorAdmin);

export const questionsAdministrationRoute = routeFactory(QuestionsAdministration);

export const articleCreationRoute = routeFactory(ArticleCreation);

export const articleAdministrationRoute = routeFactory(ArticleAdministration);

export const discussionAdministrationRoute = routeFactory(DiscussionAdministration);
