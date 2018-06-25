import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import HideableButton from '../Icons/HideableButton';

function CancelButton({
  onClick,
  style,
  intl: { formatMessage: t },
}) {
  return (
    <div style={style}>
      <HideableButton icon="times" onClick={onClick}>
        {t({ id: 'forms.confirm.cancel' })}
      </HideableButton>
    </div>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  intl: intlShape.isRequired,
};

CancelButton.defaultProps = {
  style: undefined,
};

export default injectIntl(CancelButton);
