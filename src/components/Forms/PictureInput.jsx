import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import { Card, Icon } from 'antd';
import Dropzone from 'react-dropzone';

const styles = {
  card: {
    maxWidth: '200px',
  },
  dropzone: {
    borderWidth: '5px',
    borderRadius: '15px',
    borderStyle: 'dashed',
    padding: '15px',
  },
};

class PictureInput extends Component {
  static propTypes = {
    imagePlaceholder: PropTypes.string,
    instructions: PropTypes.shape({
      drop: PropTypes.string.isRequired,
      changePicture: PropTypes.string.isRequired,
    }).isRequired,
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  };

  static defaultProps = {
    imagePlaceholder: undefined,
  };

  state = { editing: false };

  handleOnDrop = ([addedPhoto]) => {
    this.setState({ editing: false, addedPhoto });
    this.props.input.onChange(addedPhoto);
  }

  handleEditClicked = () => {
    this.setState({ editing: true });
  }

  render() {
    const { imagePlaceholder, instructions } = this.props;
    const { editing, addedPhoto } = this.state;

    if (!editing && (addedPhoto || imagePlaceholder)) {
      const cover = <img alt="added" src={addedPhoto ? addedPhoto.preview : imagePlaceholder} />;
      const actions = [
        <Icon type="edit" onClick={this.handleEditClicked}>{instructions.changePicture}</Icon>,
      ];

      return <Card cover={cover} actions={actions} style={styles.card} hoverable />;
    }

    return (
      <Dropzone
        accept="image/*"
        onDrop={this.handleOnDrop}
        multiple={false}
        style={styles.dropzone}
      >
        <p>{instructions.drop}</p>
      </Dropzone>
    );
  }
}

export default PictureInput;
