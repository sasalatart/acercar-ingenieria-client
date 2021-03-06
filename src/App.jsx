import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StyleRoot } from 'radium';
import 'antd/dist/antd.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import configureStore from './store/configure-store';
import Bootstrap from './containers/Bootstrap';
import configureIcons from './lib/icons';

const { store, persistor } = configureStore();
configureIcons();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleRoot>
          <Bootstrap />
        </StyleRoot>
      </PersistGate>
    </Provider>
  );
}
