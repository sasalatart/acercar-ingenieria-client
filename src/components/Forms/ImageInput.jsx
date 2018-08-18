import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import { Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fieldMetaShape } from '../../shapes';
import { themeStyles } from '../../theme';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    maxHeight: '200px',
  },
  error: themeStyles.error,
};

export default class ImageInput extends Component {
  static propTypes = {
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    imagePlaceholder: PropTypes.string,
    meta: fieldMetaShape.isRequired,
  };

  static defaultProps = {
    label: undefined,
    imagePlaceholder: undefined,
  };

  state = { imageUrl: this.props.imagePlaceholder }

  componentDidMount() {
    this.fileReader = new FileReader();
    this.fileReader.addEventListener('load', this.setImageUrl);
  }

  componentWillUnmount() {
    this.fileReader.removeEventListener('load', this.setImageUrl);
  }

  setImageUrl = ({ target: { result: imageUrl } }) => {
    this.setState({ imageUrl });
  }

  handleChange = ({ file }) => {
    this.fileReader.readAsDataURL(file);
    this.props.input.onChange(file);
  }

  renderImage() {
    const { imageUrl } = this.state;
    if (!imageUrl) {
      return <FontAwesomeIcon icon="plus" />;
    }

    return <img alt="input" src={imageUrl} style={styles.image} />;
  }

  render() {
    const { input, label, meta: { error } } = this.props;

    return (
      <div style={styles.container}>
        {label && <p style={themeStyles.label}>{label}:</p>}
        <Upload
          listType="picture-card"
          fileList={input.value ? [input.value] : undefined}
          onChange={this.handleChange}
          beforeUpload={() => false}
          showUploadList={false}
        >
          {this.renderImage()}
        </Upload>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
  }
}
