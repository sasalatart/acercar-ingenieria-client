import React from 'react';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import Admin from './Admin';
import MajorAdmin from './MajorAdmin';
import QuestionsAdministration from './QuestionsAdministration';
import ArticleCreation from './ArticleCreation';
import ArticleAdministration from './ArticleAdministration';
import DiscussionAdministration from './DiscussionAdministration';

export function renderLoggedOutRoute(component, extraParams) {
  return props => <LoggedOut {...props} {...extraParams} component={component} />;
}

export function renderLoggedInRoute(component, extraParams) {
  return props => <LoggedIn {...props} {...extraParams} component={component} />;
}

export function renderAdminRoute(component, extraParams) {
  return props => <Admin {...props} {...extraParams} component={component} />;
}

export function renderMajorAdminRoute(component, extraParams) {
  return props => <MajorAdmin {...props} {...extraParams} component={component} />;
}

export function renderQuestionsAdministrationRoute(component, extraParams) {
  return props => <QuestionsAdministration {...props} {...extraParams} component={component} />;
}

export function renderArticleCreationRoute(component, extraParams) {
  return props => <ArticleCreation {...props} {...extraParams} component={component} />;
}

export function renderArticleAdministrationRoute(component, extraParams) {
  return props => <ArticleAdministration {...props} {...extraParams} component={component} />;
}

export function renderDiscussionAdministrationRoute(component, extraParams) {
  return props => <DiscussionAdministration {...props} {...extraParams} component={component} />;
}
