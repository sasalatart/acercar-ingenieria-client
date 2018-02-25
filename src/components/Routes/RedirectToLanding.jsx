import React from 'react';
import { Redirect } from 'react-router-dom';
import ROUTES from '../../routes';

export default function RedirectToLanding() {
  return <Redirect to={ROUTES.LANDING} />;
}
