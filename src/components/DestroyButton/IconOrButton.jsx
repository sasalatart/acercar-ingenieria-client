import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Icon, Button } from 'antd';
import noop from 'lodash/noop';

function DestroyIconOrButton({
  loading,
  iconOnly,
  label,
  onClick,
  intl: { formatMessage: t },
}) {
  if (iconOnly) {
    return <Icon type={loading ? 'loading' : 'delete'} onClick={onClick} />;
  }

  return (
    <Button
      type="danger"
      icon="delete"
      loading={loading}
      onClick={onClick}
    >
      {label || t({ id: 'forms.delete' })}
    </Button>
  );
}

DestroyIconOrButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  iconOnly: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  intl: intlShape.isRequired,
};

DestroyIconOrButton.defaultProps = {
  label: undefined,
  onClick: noop,
};

export default injectIntl(DestroyIconOrButton);
