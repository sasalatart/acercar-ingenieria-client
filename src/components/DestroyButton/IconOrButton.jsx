import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Icon } from 'antd';
import noop from 'lodash/noop';
import HideableButton from '../HideableButton';

const styles = {
  cursor: withPointer => ({
    cursor: withPointer ? 'pointer' : 'default',
  }),
};

function DestroyIconOrButton({
  loading,
  iconOnly,
  label,
  onClick,
  intl: { formatMessage: t },
}) {
  if (iconOnly) {
    const type = loading ? 'loading' : 'delete';
    return <Icon type={type} onClick={onClick} style={styles.cursor(!loading)} />;
  }

  return (
    <HideableButton
      type="danger"
      icon="delete"
      loading={loading}
      onClick={onClick}
    >
      {label || t({ id: 'forms.delete' })}
    </HideableButton>
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
