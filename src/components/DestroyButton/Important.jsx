import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Alert, Input, Button } from 'antd';
import WithModal from '../../hoc/WithModal';
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
    onModalOpen: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
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
    const { warningMessage, textToFill, intl: { formatMessage: t } } = this.props;

    return (
      <div>
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
      </div>
    );
  }

  renderFooter() {
    const { label, onModalClose, intl: { formatMessage: t } } = this.props;
    const { disabled } = this.state;

    return (
      [
        <Button key="close" icon="close" onClick={onModalClose}>
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
      loading,
      iconOnly,
      label,
      onModalOpen,
      renderModal,
      intl: { formatMessage: t },
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
          t({ id: 'forms.confirm.message' }),
          this.renderContents(),
          this.renderFooter(),
        )}
      </span>
    );
  }
}

export default injectIntl(WithModal(ImportantDestroyButton));
