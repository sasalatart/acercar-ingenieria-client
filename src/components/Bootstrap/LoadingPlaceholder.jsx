import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRevealText from 'react-reveal-text';
import { colors } from '../../theme';
import logo from '../../images/logo.png';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    background: colors.primaryLight,
  },
  logo: {
    maxHeight: '300px',
    maxWidth: '300px',
  },
  revealText: {
    fontSize: '3em',
    color: 'white',
    marginTop: '25px',
  },
};

export default class LoadingPlaceholder extends Component {
  static propTypes = {
    onLogoDisplayed: PropTypes.func.isRequired,
  };

  state = { show: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 200);

    setTimeout(() => {
      this.props.onLogoDisplayed();
    }, 3000);
  }

  render() {
    return (
      <div style={styles.container}>
        <img src={logo} alt="logo" style={styles.logo} />
        <ReactRevealText show={this.state.show} style={styles.revealText}>
          Acercar Ingeniería
        </ReactRevealText>
      </div>
    );
  }
}
