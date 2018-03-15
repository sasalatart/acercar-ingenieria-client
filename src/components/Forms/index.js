import { Input, InputNumber } from 'antd';
import createComponent from './BaseComponent';
import CustomSelect from './CustomSelect';
import CustomRadio from './CustomRadio';
import mapError, { customMap } from './map-error';

const eventMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.target.value),
}));

const textFieldMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.nativeEvent.target.value),
}));

const selectFieldMap = customMap(({ input: { value }, multiple, options }) => {
  if (options && options.length > 0 && !value) {
    // eslint-disable-next-line no-param-reassign
    value = multiple ? [options[0].value] : options[0].value;
  }
  return { dropdownMatchSelectWidth: true, value, style: { minWidth: 200 } };
});

export const TextField = createComponent(Input, textFieldMap);
export const NumberField = createComponent(InputNumber, mapError);
export const TextArea = createComponent(Input.TextArea, textFieldMap);
export { default as RichTextField } from './RichTextInput';
export { default as PictureField } from './PictureInput';
export { default as FilesField } from './FilesInput';
export { default as SwitchField } from './CustomSwitch';
export const SelectField = createComponent(CustomSelect, selectFieldMap);
export const RadioField = createComponent(CustomRadio, eventMap);
export { default as SubmitButton } from './SubmitButton';
