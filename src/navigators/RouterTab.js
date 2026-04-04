import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Colors
 

// Custom TabBar component (optional)
 
 
import { Screens } from '../screens';
import { Colors } from '../constants';
 
 
 
const Tab = createBottomTabNavigator();

const RouterTab = () => {
  return (
    <Tab.Navigator
      // tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        tabBarInactiveTintColor: Colors.SECONDARY_COLOR,
        tabBarStyle: { height: 70 },
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Chat"
    >
      <Tab.Screen name="Chat" component={Screens.ChatScreen} />
 
      <Tab.Screen name="Profile" component={Screens.Profile} />
 
            
    </Tab.Navigator>
  );
};

export default RouterTab;
