import React from 'react';
import FormItem from 'antd/lib/form/FormItem';

export default function createComponent(AntdComponent, mapProps) {
  function InputComponent(props) {
    const {
      label,
      labelCol,
      wrapperCol,
      help,
      extra,
      validateStatus,
      hasFeedback = true,
      colon,
      style,
      ...rest
    } = mapProps(props);

    return (
      <FormItem
        label={label}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        help={help}
        extra={extra}
        validateStatus={validateStatus}
        hasFeedback={hasFeedback}
        colon={colon}
        style={style}
      >
        <AntdComponent {...rest} />
      </FormItem>
    );
  }

  InputComponent.dispayName = `Redux-form-ANTD${AntdComponent.dispayName}`;

  return InputComponent;
}
