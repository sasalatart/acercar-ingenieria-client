export const required = message => value => (
  value ? undefined : message
);

export const minLength = (message, minValue) => value => (
  value.length < minValue
    ? message
    : undefined
);

export const maxLength = (message, maxValue) => value => (
  value.length > maxValue
    ? message
    : undefined
);

export const isBetween = (message, minValue, maxValue) => value => (
  value < minValue || value > maxValue
    ? message
    : undefined
);

export const pucEmail = message => value => (
  value && !/[0-9._%a-z-]+@(?:uc|puc|ing.puc)\.cl/i.test(value)
    ? message
    : undefined
);

export const isEqualTo = (message, target) => (value, allValues) => (
  value !== allValues[target]
    ? message
    : undefined
);
