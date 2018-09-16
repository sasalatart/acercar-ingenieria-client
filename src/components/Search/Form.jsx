import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField, SubmitButton } from '../Forms';

function SearchForm({
  searchTextLabel,
  valid,
  submitting,
  extraFields,
  handleSubmit,
  style,
}) {
  return (
    <form onSubmit={handleSubmit} style={style}>
      {extraFields}
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
  extraFields: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

SearchForm.defaultProps = {
  extraFields: null,
  style: {},
};

export default SearchForm;
