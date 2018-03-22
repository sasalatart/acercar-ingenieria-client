import React from 'react';
import LoggedOutRoute from './LoggedOut';
import LoggedInRoute from './LoggedIn';
import AdminRoute from './Admin';
import MajorAdminRoute from './MajorAdmin';
import QuestionsPrivilegesRoute from './QuestionsPrivileges';
import ArticlePrivilegesRoute from './ArticlePrivileges';
import DiscussionPrivilegesRoute from './DiscussionPrivileges';

export function renderLoggedOutRoute(component, extraParams) {
  return props => <LoggedOutRoute {...props} {...extraParams} component={component} />;
}

export function renderLoggedInRoute(component, extraParams) {
  return props => <LoggedInRoute {...props} {...extraParams} component={component} />;
}

export function renderAdminRoute(component, extraParams) {
  return props => <AdminRoute {...props} {...extraParams} component={component} />;
}

export function renderMajorAdminRoute(component, extraParams) {
  return props => <MajorAdminRoute {...props} {...extraParams} component={component} />;
}

export function renderQuestionsPrivilegesRoute(component, extraParams) {
  return props => <QuestionsPrivilegesRoute {...props} {...extraParams} component={component} />;
}

export function renderArticlePrivilegesRoute(component, extraParams) {
  return props => <ArticlePrivilegesRoute {...props} {...extraParams} component={component} />;
}

export function renderDiscussionPrivilegesRoute(component, extraParams) {
  return props => <DiscussionPrivilegesRoute {...props} {...extraParams} component={component} />;
}
