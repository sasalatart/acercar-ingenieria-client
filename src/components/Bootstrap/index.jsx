import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntlProvider from '../../containers/IntlProvider';
import LoadingPlaceholder from './LoadingPlaceholder';
import Router from '../Routes/Router';

export default class Bootstrap extends Component {
  static propTypes = {
    currentUserId: PropTypes.number,
    loadUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentUserId: undefined,
  }

  state = { fetching: !!this.props.currentUserId, displayingLogo: !!this.props.currentUserId };

  componentDidMount() {
    if (this.props.currentUserId) {
      this.props.loadUser(this.props.currentUserId, true)
        .then(this.handleFinishedFetching)
        .catch(this.handleFinishedFetching);
    }
  }

  handleFinishedFetching = () => this.setState({ fetching: false });

  handleLogoDisplayed = () => this.setState({ displayingLogo: false });

  render() {
    return this.state.fetching || this.state.displayingLogo
      ? <LoadingPlaceholder onLogoDisplayed={this.handleLogoDisplayed} />
      : <IntlProvider><Router /></IntlProvider>;
  }
}
