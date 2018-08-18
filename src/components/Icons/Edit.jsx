import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ToolTipIcon from './ToolTipIcon';

function EditIcon({ onClick, to }) {
  const toRender = (
    <ToolTipIcon
      toolTip={<FormattedMessage id="forms.edit" />}
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
};

EditIcon.defaultProps = {
  to: undefined,
  onClick: undefined,
};

export default EditIcon;
