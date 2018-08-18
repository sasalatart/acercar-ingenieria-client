import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Popconfirm } from 'antd';
import DestroyIconOrButton from './IconOrButton';

function DestroyButton({
  loading,
  iconOnly,
  label,
  onDestroy,
}) {
  return (
    <Popconfirm
      title={<FormattedMessage id="forms.confirm.message" />}
      okText={<FormattedMessage id="forms.confirm.yes" />}
      cancelText={<FormattedMessage id="forms.confirm.cancel" />}
      onConfirm={onDestroy}
    >
      <DestroyIconOrButton loading={loading} iconOnly={iconOnly} label={label} />
    </Popconfirm>
  );
}

DestroyButton.propTypes = {
  loading: PropTypes.bool,
  iconOnly: PropTypes.bool,
  label: PropTypes.string,
  onDestroy: PropTypes.func.isRequired,
};

DestroyButton.defaultProps = {
  loading: false,
  iconOnly: false,
  label: undefined,
};

export default DestroyButton;
