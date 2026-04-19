import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "../../../../firebase/firebaseConfig";
import { Components } from "../../../components";
import { navigate } from "../../../utils/NavigationUtils";
import { setIsUserIsLoggedIn, setUserDetails } from "../../../redux/slices/useDetails/userSlice";
import { Helper } from "../../../helpers/helper/Helper";
import { checkErrorMessage } from "../../../helpers/errorHandler/checkErrorMessage";
import styles from "./LoginScreen.styles";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  useFocusEffect(
    React.useCallback(() => {
      setInputs({ email: "", password: "" });
      setErrors({ email: "", password: "" });
    }, [])
  );

  const handleOnchange = (text: string, input: string) => {
    setInputs(prev => ({ ...prev, [input]: text }));
  };

  const handleError = (error: string | null, input: string) => {
    setErrors(prev => ({ ...prev, [input]: error || "" }));
  };

  const validation = () => {
    Keyboard.dismiss();

    let valid = true;

    if (!Helper.isValidEmail(inputs.email)) {
      handleError("Enter valid email", "email");
      valid = false;
    }

    if (inputs.password.length < 6) {
      handleError("Min 6 characters", "password");
      valid = false;
    }

    if (valid) handleLogin();
  };

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      const docRef = doc(db, "users", res.user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        dispatch(setUserDetails(snap.data()));
        dispatch(setIsUserIsLoggedIn(true));
        navigate("HomeStack");
      }
    } catch (e: any) {
      checkErrorMessage(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0F172A" barStyle="light-content" />
      <Components.SafeAreaContainer>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, }}
          showsVerticalScrollIndicator={false}
        >
          <Components.SizedBox verticalSpace={5} />
          {/* LOGO */}
          <Components.Logo
            animationStyle={{
              width: responsiveWidth(40),
              height: responsiveWidth(40),
              alignSelf: "center",
            }}
            containerStyle={{

              alignSelf: "center",

            }}
          />



          {/* CARD */}
          <View style={styles.card}>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

            <Components.SizedBox verticalSpace={4} />

            <Components.InputField
              label="Email"
              placeholder="Enter your email"
              value={inputs.email}
              onChangeText={(t) => handleOnchange(t, "email")}
              error={errors.email}
              onFocus={() => handleError("", "email")}
            />

            <Components.InputField
              label="Password"
              placeholder="••••••••"
              isPassword
              value={inputs.password}
              onChangeText={(t) => handleOnchange(t, "password")}
              error={errors.password}
              onFocus={() => handleError("", "password")}
            />

            <Components.SizedBox verticalSpace={5} />

            <Components.Button buttonLabel="Login" onPress={validation} />

            <Components.SizedBox verticalSpace={4} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Text style={styles.signup} onPress={() => navigate("SignUp")}>
                Sign up
              </Text>
            </View>

          </View>

        </KeyboardAwareScrollView>
      </Components.SafeAreaContainer>
    </View >
  );
};

export default LoginScreen;