import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Modal, Alert, Input, Button } from 'antd';
import DestroyIconOrButton from './IconOrButton';

const styles = {
  alert: {
    marginBottom: '25px',
  },
};

class ImportantDestroyButton extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    iconOnly: PropTypes.bool,
    label: PropTypes.string,
    warningMessage: PropTypes.string.isRequired,
    textToFill: PropTypes.string.isRequired,
    onDestroy: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    iconOnly: false,
    label: undefined,
  }

  state = { modalOpen: false, disabled: true };

  handleShowModal = () => {
    this.setState({ modalOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  }

  handleDestroy = () => {
    this.handleCloseModal();
    this.props.onDestroy();
  }

  handleTextChange = ({ target: { value } }) => {
    this.setState({ disabled: value !== this.props.textToFill });
  }

  renderFooter() {
    const { label, intl: { formatMessage: t } } = this.props;
    const { disabled } = this.state;

    return (
      [
        <Button key="close" icon="close" onClick={this.handleCloseModal}>
          {t({ id: 'forms.confirm.cancel' })}
        </Button>,
        <Button key="submit" type="danger" disabled={disabled} onClick={this.handleDestroy}>
          {label || t({ id: 'forms.delete' })}
        </Button>,
      ]
    );
  }

  render() {
    const {
      loading, iconOnly, label, warningMessage, textToFill, intl: { formatMessage: t },
    } = this.props;

    return (
      <span>
        <DestroyIconOrButton
          loading={loading}
          iconOnly={iconOnly}
          label={label}
          onClick={this.handleShowModal}
        />
        <Modal
          visible={this.state.modalOpen}
          title={t({ id: 'forms.confirm.message' })}
          onCancel={this.handleCloseModal}
          footer={this.renderFooter()}
        >
          <Alert
            type="warning"
            message={t({ id: 'forms.warning' })}
            description={warningMessage}
            style={styles.alert}
            showIcon
          />
          <Input
            placeholder={t({ id: 'forms.confirm.textToFill' }, { textToFill })}
            onChange={this.handleTextChange}
          />
        </Modal>
      </span>
    );
  }
}

export default injectIntl(ImportantDestroyButton);
