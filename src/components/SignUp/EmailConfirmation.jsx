import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RedirectToLanding from '../Routes/RedirectToLanding';

export default class EmailConfirmation extends Component {
  static propTypes = {
    confirmEmail: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.confirmEmail();
  }

  render() {
    return <RedirectToLanding />;
  }
}
