import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidMount() {
    this.props.loadPinned();
  }

  render() {
    return (
      <div>
        <h1>Landing</h1>
        <button onClick={this.props.goToMajors}>Go to Majors</button>
      </div>
    );
  }
}

Landing.propTypes = {
  loadPinned: PropTypes.func.isRequired,
  goToMajors: PropTypes.func.isRequired,
};

export default Landing;
