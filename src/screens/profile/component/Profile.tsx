import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import { Components } from "../../../components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig";
import { resetAndNavigate } from "../../../utils/NavigationUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsUserIsLoggedIn,
  setUserDetails,
} from "../../../redux/slices/useDetails/userSlice";
import { persistor, RootState } from "../../../redux/store/Store";
import GetImage from "../../../components/getImage";
import styles from "./Profile.style";

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state: RootState) => state.user?.userDetails
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await persistor.purge();
      dispatch(setUserDetails(null));
      dispatch(setIsUserIsLoggedIn(false));
      resetAndNavigate("AuthStack");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: handleLogout },
    ]);
  };

  return (
    <Components.Background>
      <Components.SafeAreaContainer>
        <View style={styles.container}>

          {/* 🔵 HEADER */}
          <View style={styles.header}>
            <View style={styles.avatarWrapper}>
              <GetImage
                source={userDetails?.profile_pic}
                style={styles.profileImage}
              />
            </View>

            <Text style={styles.name}>{userDetails?.name}</Text>
            <Text style={styles.email}>{userDetails?.email}</Text>
          </View>

          {/* 🔵 INFO CARDS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account</Text>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Edit Profile</Text>
              <AntDesign name="right" size={16} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Privacy</Text>
              <AntDesign name="right" size={16} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Settings</Text>
              <AntDesign name="right" size={16} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* 🔴 LOGOUT BUTTON */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={confirmLogout}
            activeOpacity={0.8}
          >
            <AntDesign name="logout" size={18} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

        </View>
      </Components.SafeAreaContainer>
    </Components.Background>
  );
};

export default Profile;