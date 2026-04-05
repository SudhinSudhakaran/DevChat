import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// === Screens ===
import RouterTab from './RouterTab';
import { Screens } from '../screens';
  
 
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
      <Stack.Screen name="FriendsDetails" component={Screens.FriendsDetails} />
      <Stack.Screen name="MessageScreen" component={Screens.MessageScreen} />
  
      
    </Stack.Navigator>
  );
};
export default HomeStack;
const styles = StyleSheet.create({});
