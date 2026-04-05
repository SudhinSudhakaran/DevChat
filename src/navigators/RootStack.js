import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../utils/NavigationUtils';
// === Screens ===
 

 

 
import { Screens } from '../screens';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import { Colors } from '../constants';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
          headerShown: false,
          contentStyle: { backgroundColor: Colors.BACKGROUND_COLOR },
        }}
        initialRouteName="SplashScreen">
       
 <Stack.Screen name="SplashScreen" component={Screens.SplashScreen} />
     <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;

