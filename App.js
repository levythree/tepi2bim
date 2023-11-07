import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './app/screens/Login';
import Register from './app/screens/Register';
import LoggedInScreen from './app/screens/LoggedInScreen';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from './FirebaseConfig';
import ForgotPassword from './app/screens/ForgotPassword';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(`user: ${user}`);

      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        { user ? (
          <Stack.Screen name="LoggedIn" component={LoggedInScreen} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        ) }
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/* 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from './FirebaseConfig';
import Register from './app/screens/Register';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(`user: ${user}`);

      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Teste' component={teste} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
