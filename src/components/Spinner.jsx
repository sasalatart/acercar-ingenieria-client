import React from 'react';
import { Spin } from 'antd';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
};

export default function Spinner() {
  return (
    <div style={styles.wrapper}>
      <Spin size="large" />
    </div>
  );
}
