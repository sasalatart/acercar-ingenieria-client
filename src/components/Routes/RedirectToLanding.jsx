import React from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../../lib/routes';

export default function RedirectToLanding() {
  return <Redirect to={routes.landing} />;
}
