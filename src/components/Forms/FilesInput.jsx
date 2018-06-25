import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import Dropzone from 'react-dropzone';
import { List } from 'antd';
import uniqBy from 'lodash/uniqBy';
import IconText from '../Icons/IconText';
import DestroyButton from '../DestroyButton';
import { attachmentShape, fieldMetaShape } from '../../shapes';
import { themeStyles } from '../../theme';

const { Item } = List;

const styles = {
  dropzone: {
    borderWidth: '5px',
    borderRadius: '15px',
    borderStyle: 'dashed',
    padding: '15px',
  },
  attachmentsList: {
    marginBottom: '5px',
  },
  error: themeStyles.error,
};

class FilesInput extends Component {
  static propTypes = {
    previousAttachments: PropTypes.arrayOf(attachmentShape).isRequired,
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: fieldMetaShape.isRequired,
    label: PropTypes.string,
    instructions: PropTypes.string.isRequired,
  };

  static defaultProps = {
    label: undefined,
  };

  state = {
    activeFiles: [],
    destroyedFiles: [],
    previousFiles: this.props.previousAttachments
      .map(({ id, filename, byteSize }) => ({
        id,
        name: filename,
        size: byteSize,
      })),
  };

  handleOnDrop = (newFiles) => {
    const activeFiles = this.state.activeFiles
      ? uniqBy([...this.state.activeFiles, ...newFiles], file => file.name)
      : newFiles;

    this.setState({ activeFiles });
    this.props.input.onChange(activeFiles.concat(this.state.destroyedFiles));
  }

  handleRemoveFile = (file) => {
    const filterFn = ({ name }) => name !== file.name;
    const activeFiles = this.state.activeFiles.filter(filterFn);
    const previousFiles = this.state.previousFiles.filter(filterFn);
    const destroyedFiles = file.id
      ? this.state.destroyedFiles.concat({ id: file.id, _destroy: true })
      : this.state.destroyedFiles;

    this.setState({ activeFiles, previousFiles, destroyedFiles });
    this.props.input.onChange(activeFiles.concat(destroyedFiles));
  }

  renderFile = (file) => {
    const actions = [<DestroyButton onDestroy={() => this.handleRemoveFile(file)} iconOnly />];

    const size = Math.round((file.size / (1024 ** 2)) * 100) / 100;
    const text = `${file.name} (${size}MB)`;
    return (
      <Item actions={actions}>
        <IconText icon="paperclip" text={text} />
      </Item>
    );
  }

  renderAddedFiles() {
    const { activeFiles, previousFiles } = this.state;
    const filesToRender = activeFiles.concat(previousFiles);

    if (!filesToRender.length) {
      return null;
    }

    return (
      <List
        dataSource={filesToRender}
        renderItem={this.renderFile}
        size="small"
        style={styles.attachmentsList}
        bordered
      />
    );
  }

  render() {
    const { label, instructions, meta: { error } } = this.props;

    return (
      <div>
        {label && <p style={themeStyles.label}>{label}:</p>}
        {this.renderAddedFiles()}
        <Dropzone onDrop={this.handleOnDrop} style={styles.dropzone}>
          <p>{instructions}</p>
        </Dropzone>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
  }
}

export default FilesInput;
