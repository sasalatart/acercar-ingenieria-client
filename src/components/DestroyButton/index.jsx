import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Popconfirm } from 'antd';
import DestroyIconOrButton from './IconOrButton';

function DestroyButton({
  loading,
  iconOnly,
  label,
  onDestroy,
  intl: { formatMessage: t },
}) {
  return (
    <Popconfirm
      title={t({ id: 'forms.confirm.message' })}
      okText={t({ id: 'forms.confirm.yes' })}
      ancelText={t({ id: 'forms.confirm.cancel' })}
      onConfirm={onDestroy}
    >
      <DestroyIconOrButton
        loading={loading}
        iconOnly={iconOnly}
        label={label}
      />
    </Popconfirm>
  );
}

DestroyButton.propTypes = {
  loading: PropTypes.bool,
  iconOnly: PropTypes.bool,
  label: PropTypes.string,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

DestroyButton.defaultProps = {
  loading: false,
  iconOnly: false,
  label: undefined,
};

export default injectIntl(DestroyButton);
