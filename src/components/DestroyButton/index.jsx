import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Popconfirm } from 'antd';
import DestroyIconOrButton from './IconOrButton';

function DestroyButton({
  loading, iconOnly, onDestroy, intl: { formatMessage: t },
}) {
  return (
    <Popconfirm
      title={t({ id: 'forms.confirm.message' })}
      okText={t({ id: 'forms.confirm.yes' })}
      ancelText={t({ id: 'forms.confirm.cancel' })}
      onConfirm={onDestroy}
    >
      <DestroyIconOrButton loading={loading} iconOnly={iconOnly} />
    </Popconfirm>
  );
}

DestroyButton.propTypes = {
  loading: PropTypes.bool,
  iconOnly: PropTypes.bool,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

DestroyButton.defaultProps = {
  loading: false,
  iconOnly: false,
};

export default injectIntl(DestroyButton);
