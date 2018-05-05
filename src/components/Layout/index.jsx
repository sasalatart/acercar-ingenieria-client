import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import Spaced from './Spaced';
import { locationShape } from '../../shapes';
import { colors } from '../../theme';

const styles = {
  background: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.secondaryLight,
    minHeight: '100vh',
  },
  body: {
    flex: 1,
    position: 'relative',
  },
};

class AILayout extends Component {
  static propTypes = {
    location: locationShape.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { pathname, search } = this.props.location;
    const pathnameChanged = prevProps.location.pathname !== pathname;
    const searchChanged = prevProps.location.search !== search;

    if (this.contentTop && (pathnameChanged || searchChanged)) {
      this.contentTop.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div style={styles.background}>
        <Header />
        <div ref={(el) => { this.contentTop = el; }} />
        <Spaced style={styles.body}>
          {children}
        </Spaced>
        <Footer />
      </div>
    );
  }
}

export default withRouter(AILayout);
