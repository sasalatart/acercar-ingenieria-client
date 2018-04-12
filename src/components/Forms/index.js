import { Input, InputNumber } from 'antd';
import createComponent from './BaseComponent';
import CustomSelect, { CustomTagsSelect } from './CustomSelect';
import CustomRadio from './CustomRadio';
import {
  textFieldMap,
  selectFieldMap,
  eventMap,
  mapError,
} from './maps';

export const TextField = createComponent(Input, textFieldMap);
export const NumberField = createComponent(InputNumber, mapError);
export const TextArea = createComponent(Input.TextArea, textFieldMap);
export { default as RichTextField } from './RichTextInput';
export { default as ImageField } from './ImageInput';
export { default as FilesField } from './FilesInput';
export { default as SwitchField } from './CustomSwitch';
export const SelectField = createComponent(CustomSelect, selectFieldMap);
export const TagsField = createComponent(CustomTagsSelect, selectFieldMap);
export const RadioField = createComponent(CustomRadio, eventMap);
export { default as CancelButton } from './CancelButton';
export { default as SubmitButton } from './SubmitButton';
