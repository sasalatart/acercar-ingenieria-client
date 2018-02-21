import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: '12px',
    minWidth: '200px',
  },
};

function SubmitButton({
  disabled, loading, size, intl: { formatMessage: t },
}) {
  return (
    <div style={styles.wrapper}>
      <Button
        type="primary"
        htmlType="submit"
        disabled={disabled}
        loading={loading}
        size={size}
        style={styles.submitButton}
      >
        {t({ id: 'forms.submit' })}
      </Button>
    </div>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
  intl: intlShape.isRequired,
};

SubmitButton.defaultProps = {
  size: 'large',
};

export default injectIntl(SubmitButton);
