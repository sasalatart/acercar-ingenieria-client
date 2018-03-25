const getValidateStatus = (touched, error, warning, valid) => {
  if (!touched) {
    return '';
  }

  if (error) {
    return 'error';
  }

  if (warning) {
    return 'warning';
  }

  if (valid) {
    return 'success';
  }

  return '';
};

export const mapError = ({
  meta: {
    touched, error, warning, valid,
  } = {},
  input: { ...inputProps },
  ...props
}) => ({
  ...props,
  ...inputProps,
  validateStatus: getValidateStatus(touched, error, warning, valid),
  help: touched && (error || warning),
});

export const customMap = customPropsFn => props => ({
  ...mapError(props),
  ...customPropsFn(props),
});

export const eventMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.target.value),
}));

export const textFieldMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.nativeEvent.target.value),
}));

export const selectFieldMap = customMap(({
  input: { value }, multiple, tags, options,
}) => {
  if (options && options.length > 0 && !value) {
    // eslint-disable-next-line no-param-reassign
    value = (multiple || tags) ? [] : undefined;
  }
  return { dropdownMatchSelectWidth: true, value, style: { minWidth: 200 } };
});
