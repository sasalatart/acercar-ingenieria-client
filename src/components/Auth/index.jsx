import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoverPassword from './RecoverPassword';
import ChangePassword from '../Users/Profile/ChangePassword';

export default function Auth() {
  return (
    <Switch>
      <Route path="/auth/sign-in" component={SignIn} />
      <Route path="/auth/sign-up" component={SignUp} />
      <Route path="/auth/password/recover" component={RecoverPassword} />
      <Route path="/auth/password/edit" component={ChangePassword} />
    </Switch>
  );
}
