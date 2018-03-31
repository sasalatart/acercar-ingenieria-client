import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { renderLoggedOutRoute } from '../../containers/Routes';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoverPassword from './RecoverPassword';
import ChangePassword from '../Users/Profile/ChangePassword';
import EmailConfirmation from '../../containers/Auth/EmailConfirmation';

export default function Auth() {
  return (
    <Switch>
      <Route path="/auth/sign-in" render={renderLoggedOutRoute(SignIn)} />
      <Route path="/auth/sign-up" render={renderLoggedOutRoute(SignUp)} />
      <Route path="/auth/password/recover" render={renderLoggedOutRoute(RecoverPassword)} />
      <Route path="/auth/password/edit" render={renderLoggedOutRoute(ChangePassword)} />
      <Route path="/auth/confirmation" render={renderLoggedOutRoute(EmailConfirmation)} />
    </Switch>
  );
}
