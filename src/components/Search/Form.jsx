import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import noop from 'lodash/noop';
import {
  TextField,
  SubmitButton,
} from '../Forms';

function SearchForm({
  searchTextLabel,
  valid,
  submitting,
  renderExtraFields,
  handleSubmit,
  style,
}) {
  return (
    <form onSubmit={handleSubmit} style={style}>
      {renderExtraFields()}
      <Field
        name="search"
        component={TextField}
        label={searchTextLabel}
        disabled={submitting}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

SearchForm.propTypes = {
  searchTextLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  renderExtraFields: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

SearchForm.defaultProps = {
  renderExtraFields: noop,
  style: {},
};

export default SearchForm;
