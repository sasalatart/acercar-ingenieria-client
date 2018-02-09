import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

class Landing extends Component {
  static propTypes = {
    loadPinned: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  componentDidMount() {
    this.props.loadPinned();
  }

  render() {
    return <h1>{this.props.intl.formatMessage({ id: 'routing.landing' })}</h1>;
  }
}

export default injectIntl(Landing);
