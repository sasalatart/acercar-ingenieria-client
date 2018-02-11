import { Input } from 'antd';
import createComponent from './BaseComponent';
import { customMap } from './map-error';

const textFieldMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.nativeEvent.target.value),
}));

export const TextField = createComponent(Input, textFieldMap);

export default {
  TextField,
};
