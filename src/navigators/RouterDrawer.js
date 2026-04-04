// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
 
// import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/color';
// import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

 
// import HomeStack from './HomeStack';
// import SideMenu from '../components/SideMenu';
 
// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: PRIMARY_COLOR,
//         drawerInactiveTintColor: SECONDARY_COLOR,
//         drawerStyle: {width: responsiveScreenWidth(65)},
//       }}
//       drawerContent={props => <SideMenu {...props} />}
//       useLegacyImplementation>
//       <Drawer.Screen name="HomeStack" component={HomeStack} />

//     </Drawer.Navigator>
//   );
// }
