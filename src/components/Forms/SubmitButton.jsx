import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
  disabled,
  loading,
  size,
  style,
}) {
  return (
    <div style={styles.wrapper}>
      <Button
        type="primary"
        htmlType="submit"
        disabled={disabled}
        loading={loading}
        size={size}
        style={{ ...styles.submitButton, ...style }}
      >
        <FormattedMessage id="forms.submit" />
      </Button>
    </div>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
  style: PropTypes.shape({}),
};

SubmitButton.defaultProps = {
  size: 'large',
  style: {},
};

export default SubmitButton;
