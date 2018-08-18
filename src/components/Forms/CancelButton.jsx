import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import HideableButton from '../Icons/HideableButton';

function CancelButton({ onClick, style }) {
  return (
    <div style={style}>
      <HideableButton icon="times" onClick={onClick}>
        <FormattedMessage id="forms.confirm.cancel" />
      </HideableButton>
    </div>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

CancelButton.defaultProps = {
  style: undefined,
};

export default CancelButton;
