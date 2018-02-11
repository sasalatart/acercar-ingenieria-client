export const required = message => value => (
  value ? undefined : message
);

export const minLength = (message, minValue) => value => (
  value.length < minValue
    ? message
    : undefined
);

export const pucEmail = message => value => (
  value && !/[0-9._%a-z-]+@(?:uc|puc|ing.puc)\.cl/i.test(value)
    ? message
    : undefined
);
