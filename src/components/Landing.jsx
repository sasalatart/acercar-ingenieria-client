import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidMount() {
    this.props.loadPinned();
  }

  render() {
    return <h1>Landing</h1>;
  }
}

Landing.propTypes = {
  loadPinned: PropTypes.func.isRequired,
};

export default Landing;
