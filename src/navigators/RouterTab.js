import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Colors
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/color';

// Custom TabBar component (optional)
 
import MyTabBar from '../components/BottomTab';
import Home from '../screens/home';
import Festivals from '../screens/festivals';
import Profile from '../screens/profile';
 
const Tab = createBottomTabNavigator();

const RouterTab = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: SECONDARY_COLOR,
        tabBarStyle: { height: 70 },
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Festivals" component={Festivals} />
      <Tab.Screen name="Profile" component={Profile} />
 
            
    </Tab.Navigator>
  );
};

export default RouterTab;
