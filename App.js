/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import {NativeBaseProvider} from 'native-base';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/Navigator';
const persistor = persistStore(store);
function App() {
  return ( 
      < >
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </PersistGate>
        </ReduxProvider>
      </> 
  );
}

export default App;
