import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Login from './screens/Login';
import {useSelector} from 'react-redux';
import Home from './screens/Home';
import SplashScreen from 'react-native-splash-screen';
import AddBook from './screens/AddBook';
import IssuedBook from './screens/IssuedBook';
import AddBookCode from './screens/AddBookCode/index';

const Stack = createNativeStackNavigator();
function Navigator() {
  const user = useSelector(state => state.user);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* {user.userUid ? ( */}
        <Stack.Screen name="Home" component={Home} />
      {/* ) : ( */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="IssuedBook" component={IssuedBook} />
        <Stack.Screen name="AddBookCode" component={AddBookCode} />
      {/* )} */}
    </Stack.Navigator>
  );
}

export default Navigator;
