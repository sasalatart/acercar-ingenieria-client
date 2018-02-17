import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ROUTES from '../../routes';

export default class EmailConfirmation extends Component {
  static propTypes = {
    confirmEmail: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { confirmEmail, location: { pathname, search } } = this.props;
    confirmEmail(`${pathname}${search}`);
  }

  render() {
    return <Redirect to={{ pathname: ROUTES.LANDING }} />;
  }
}
