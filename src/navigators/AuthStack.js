 
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// === Screens ===
 
import { Screens } from '../screens';
  
 
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
      initialRouteName="Login">
     
      
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
 
      <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
   
      
      
    </Stack.Navigator>
  );
};
export default AuthStack;
 
