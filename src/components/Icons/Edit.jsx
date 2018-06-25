import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import ToolTipIcon from './ToolTipIcon';

function EditIcon({ onClick, to, intl: { formatMessage: t } }) {
  const toRender = (
    <ToolTipIcon
      toolTip={t({ id: 'forms.edit' })}
      icon="edit"
      onClick={onClick}
      withPointer
    />
  );

  return to
    ? <Link to={to} href={to}>{toRender}</Link>
    : toRender;
}

EditIcon.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  intl: intlShape.isRequired,
};

EditIcon.defaultProps = {
  to: undefined,
  onClick: undefined,
};

export default injectIntl(EditIcon);
