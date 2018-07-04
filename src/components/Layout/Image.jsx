import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import keyMirror from 'keymirror';

export const sizes = keyMirror({
  thumb: null, medium: null, large: null,
});

const styles = {
  thumb: {
    height: '75px',
  },
  medium: {
    height: '200px',
  },
  large: {
    height: '880px',
  },
  hidden: {
    display: 'none',
  },
};

const widths = {
  thumb: '75px',
  medium: '200px',
  large: '1440px',
};

const containerStyle = (loaded, size) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return loaded ? style : { ...style, width: widths[size] };
};

class Image extends Component {
  static propTypes = {
    size: PropTypes.oneOf(Object.keys(sizes)),
    src: PropTypes.string.isRequired,
    spinnerSize: PropTypes.oneOf(['small', 'default', 'large']),
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    size: sizes.medium,
    spinnerSize: 'default',
    style: undefined,
  };

  state = { loaded: false };

  handleLoad = () => this.setState({ loaded: true });

  render() {
    const {
      src, size, spinnerSize, style, ...rest
    } = this.props;
    const { loaded } = this.state;

    const baseStyle = { ...styles[size], ...style };
    const imageStyle = loaded ? baseStyle : styles.hidden;

    return (
      <div style={{ ...containerStyle(loaded, size), ...baseStyle }}>
        {!loaded && <Spin size={spinnerSize} />}
        <img src={src} alt={src} onLoad={this.handleLoad} style={imageStyle} {...rest} />
      </div>
    );
  }
}

export default Image;
