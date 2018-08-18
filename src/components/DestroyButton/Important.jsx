import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Alert,
  Form,
  Input,
  Button,
} from 'antd';
import withModal from '../../hoc/withModal';
import DestroyIconOrButton from './IconOrButton';

const FormItem = Form.Item;

const styles = {
  alert: {
    marginBottom: '25px',
  },
};

class ImportantDestroyButton extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    iconOnly: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    warningMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    textToFill: PropTypes.string.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onModalOpen: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    iconOnly: false,
    label: undefined,
  }

  state = { disabled: true };

  handleDestroy = () => {
    this.props.onModalClose();
    this.props.onDestroy();
  }

  handleTextChange = ({ target: { value } }) => {
    this.setState({ disabled: value !== this.props.textToFill });
  }

  renderContents() {
    const { warningMessage, textToFill } = this.props;

    return (
      <Fragment>
        <Alert
          type="warning"
          message={<FormattedMessage id="forms.warning" />}
          description={warningMessage}
          style={styles.alert}
          showIcon
        />
        <FormItem label={<FormattedMessage id="forms.confirm.textToFill" values={{ textToFill }} />}>
          <Input onChange={this.handleTextChange} />
        </FormItem>
      </Fragment>
    );
  }

  renderFooter() {
    const { label, onModalClose } = this.props;
    const { disabled } = this.state;

    return (
      [
        <Button key="close" icon="close" onClick={onModalClose}>
          <FormattedMessage id="forms.confirm.cancel" />
        </Button>,
        <Button key="submit" type="danger" disabled={disabled} onClick={this.handleDestroy}>
          {label || <FormattedMessage id="forms.delete" />}
        </Button>,
      ]
    );
  }

  render() {
    const {
      loading,
      iconOnly,
      label,
      onModalOpen,
      renderModal,
    } = this.props;

    return (
      <span>
        <DestroyIconOrButton
          loading={loading}
          iconOnly={iconOnly}
          label={label}
          onClick={onModalOpen}
        />

        {renderModal(
          <FormattedMessage id="forms.confirm.message" />,
          this.renderContents(),
          this.renderFooter(),
        )}
      </span>
    );
  }
}

export default withModal(ImportantDestroyButton);
