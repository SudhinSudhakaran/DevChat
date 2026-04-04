import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// === Screens ===
import RouterTab from './RouterTab';
 
import Login from '../screens/login';
 
import SignUp from '../screens/signUp';
  
 
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
      initialRouteName="Tabs">
      <Stack.Screen name="Tabs" component={RouterTab} />
      
      <Stack.Screen name="Login" component={Login} />
 
      <Stack.Screen name="SignUp" component={SignUp} />
   
      <Stack.Screen name="Profile" component={Profile} />
      
    </Stack.Navigator>
  );
};
export default HomeStack;
const styles = StyleSheet.create({});
