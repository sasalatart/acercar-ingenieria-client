import { Input, InputNumber } from 'antd';
import createComponent from './BaseComponent';
import CustomSelect from './CustomSelect';
import mapError, { customMap } from './map-error';

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
export const SelectField = createComponent(CustomSelect, selectFieldMap);

export default {
  TextField,
  NumberField,
  TextArea,
  SelectField,
};
