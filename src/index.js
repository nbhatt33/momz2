import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/index';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
