export const required = message => value => (
  value ? undefined : message
);

export const minLength = (message, minValue) => value => (
  value && value.length < minValue
    ? message
    : undefined
);

export const maxLength = (message, maxValue) => value => (
  value && value.length > maxValue
    ? message
    : undefined
);

export const maxCSVLength = (message, maxValue) => value => (
  value && value.split(', ').length > maxValue
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

export const url = message => value => (
  value && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(value)
    ? message
    : undefined
);

export const isEqualTo = (message, target) => (value, allValues) => (
  value !== allValues[target]
    ? message
    : undefined
);

export const maxFileSize = (message, maxSize) => value => (
  value && value.size > maxSize
    ? message
    : undefined
);

export const image = message => value => (
  value && !value.type.includes('image')
    ? message
    : undefined
);
