import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ROUTES from '../../routes';

export default class EmailConfirmation extends Component {
  static propTypes = {
    confirmEmail: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { confirmEmail, locale, location: { pathname, search } } = this.props;
    confirmEmail(`${pathname}${search}`, locale);
  }

  render() {
    return <Redirect to={{ pathname: ROUTES.LANDING }} />;
  }
}
