import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

class Landing extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    loadPinned: PropTypes.func.isRequired,
    goToMajors: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadPinned();
  }

  render() {
    return (
      <div>
        <h1>Landing</h1>
        <button onClick={this.props.goToMajors}>
          {this.props.intl.formatMessage({ id: 'routing.majors' })}
        </button>
      </div>
    );
  }
}

export default injectIntl(Landing);
