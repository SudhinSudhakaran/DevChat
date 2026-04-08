import { StyleSheet, Text, TouchableOpacity, View ,Alert} from 'react-native'
import React from 'react'
import { Components } from '../../../components'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {signOut} from "firebase/auth";
import { auth } from '../../../../firebase/firebaseConfig';
import { navigate, resetAndNavigate } from '../../../utils/NavigationUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserIsLoggedIn, setUserDetails } from '../../../redux/slices/useDetails/userSlice';
import { persistor, RootState } from '../../../redux/store/Store';
const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.user?.userDetails);

  console.log('userDetails in profile ',  userDetails )
const handleLogout = async () => {
  try {
    await signOut(auth);

    // ✅ Clear persisted storage FIRST
    await persistor.purge();

    // ✅ Clear redux
    dispatch(setUserDetails(null));
    dispatch(setIsUserIsLoggedIn(false));

    // ✅ Then navigate
    resetAndNavigate("AuthStack");

    console.log("User logged out successfully");
  } catch (error) {
    console.log("Logout error:", error);
  }
};
  
const confirmLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: handleLogout }
    ]
  );
};


  return (
<Components.SafeAreaContainer>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Profile</Text>


          <TouchableOpacity
      onPress={()=>confirmLogout?.()}
      style={[styles.btnContainer]}
      activeOpacity={0.7}
 
    >
     <AntDesign
  name="logout"
  size={26}
  color="red"
 
/>
    </TouchableOpacity>

    <Text>{userDetails?.name}</Text>
     <Text>{userDetails?.email}</Text>
    </View>
  </Components.SafeAreaContainer>
  )
}
 

    export default Profile

    const styles = StyleSheet.create({
        btnContainer: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
    })