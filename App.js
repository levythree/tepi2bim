import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './app/screens/Login';
import Register from './app/screens/Register';
import LoggedInScreen from './app/screens/LoggedInScreen';
import ForgotPassword from './app/screens/ForgotPassword';  
import AddNote from './app/screens/AddNote';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from './FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My Notes" component={LoggedInScreen}></InsideStack.Screen>
      <InsideStack.Screen name="Add Note" component={AddNote}></InsideStack.Screen>
    </InsideStack.Navigator>
  )
}

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
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
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
