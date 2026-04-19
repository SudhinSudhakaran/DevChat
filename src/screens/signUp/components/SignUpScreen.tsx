


import { Keyboard, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Components } from '../../../components'
import styles from '../../login/components/LoginScreen.styles'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useFocusEffect } from '@react-navigation/native'
import I18n from '../../../i18n'
import { useEncrypt } from '../../../hooks/useEncrypt'
import { Helper } from '../../../helpers/helper/Helper'
import { goBack, navigate, resetAndNavigate } from '../../../utils/NavigationUtils'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../../../firebase/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { setIsUserIsLoggedIn, setUserDetails } from '../../../redux/slices/useDetails/userSlice'
import { useDispatch } from 'react-redux'
import { checkErrorMessage } from '../../../helpers/errorHandler/checkErrorMessage'
const SignUpScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleOnchange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validation = () => {
    Keyboard.dismiss();
    let isValidName = 0;
    let isValidEmail = 0;
    let isValidPassword = 0;
    let isValidConfirmPassword = 0;

    if (Helper.isEmpty(inputs?.name)) {
      handleError(I18n.t("Name_Required"), "name");
      isValidName = 0;
    } else {
      handleError("", "name");
      isValidName = 1;
    }

    if (Helper.isEmpty(inputs?.email)) {
      handleError(I18n.t("Email_Cant_Empty"), "email");
      isValidEmail = 0;
    } else if (!Helper.isValidEmail(inputs?.email)) {
      handleError(I18n.t("Enter_Valid_Mail"), "email");
      isValidEmail = 0;
    } else {
      handleError("", "email");
      isValidEmail = 1;
    }

    if (Helper.isEmpty(inputs?.password)) {
      handleError(I18n.t("Password_Cant_Empty"), "password");
      isValidPassword = 0;
    } else if (inputs?.password?.trim().length < 6) {
      handleError(I18n.t("Password_length_validation"), "password");
      isValidPassword = 0;
    } else {
      handleError("", "password");
      isValidPassword = 1;
    }
    if (Helper.isEmpty(inputs?.confirmPassword)) {
      handleError(I18n.t("Enter_Password_again"), "confirmPassword");
      isValidConfirmPassword = 0;
    } else if (inputs?.password !== inputs?.confirmPassword) {
      handleError(I18n.t("Password_Should_Be_Same"), "confirmPassword");
      isValidConfirmPassword = 0;
    } else {
      handleError("", "confirmPassword");
      isValidConfirmPassword = 1;
    }

    if (
      isValidName === 1 &&
      isValidEmail === 1 &&
      isValidPassword === 1 &&
      isValidConfirmPassword === 1
    ) {
      let _data = {
        ...inputs,
        fbgoogle: 0,
        encryptedEmail: useEncrypt(inputs.email),
        encryptedPassword: useEncrypt(inputs.password),
      };
      handleSignUp?.(_data);
    }
  };

  const handleSignUp = async (data: any) => {
    console.log(data);
    try {



      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);

      console.log("User signed up successfully:", response.user);
      let _user = {
        name: data.name,
        email: data.email,
        profile_pic: "",
        uid: response.user.uid,

      }
      await setDoc(doc(db, "users", response.user.uid), _user);

      dispatch(setUserDetails({
        ..._user,
        email: data.email,
        password: data.password,
      }));

      dispatch(setIsUserIsLoggedIn(true));
      resetAndNavigate('HomeStack');

    } catch (error) {
      console.log("Error signing up:", error);
      checkErrorMessage(error);
    }
  };



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0F172A" barStyle="light-content" />

      <Components.SafeAreaContainer>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
          contentContainerStyle={{ flexGrow: 1 }}
        >

          <Components.Header />


          {/* LOGO */}
          <Components.Logo
            animationStyle={{
              width: responsiveWidth(40),
              height: responsiveWidth(40),
              alignSelf: "center",
            }}
            containerStyle={{
              marginBottom: responsiveHeight(50),
            }}
          />


          {/* CARD */}
          <View style={styles.card}>
            <Components.SizedBox verticalSpace={1} />
            <Components.InputField
              label={I18n.t("Name")}
              placeholder={I18n.t("Name")}
              onChangeText={(text) => handleOnchange(text, "name")}
              error={errors.name}
              onFocus={() => handleError(null, "name")}
              keyboardType="default"   // ✅ FIXED (was email-address)
              autoCapitalize="none"
              value={inputs.name}
              isPassword={false}
            />

            <Components.InputField
              label={I18n.t("Email")}
              placeholder={I18n.t("Enter_Your_Email")}
              onChangeText={(text) => handleOnchange(text, "email")}
              error={errors.email}
              onFocus={() => handleError(null, "email")}
              keyboardType="email-address"
              autoCapitalize="none"
              value={inputs.email}
              isPassword={false}
            />

            <Components.InputField
              label={I18n.t("Password")}
              placeholder={". . . . . . . ."}
              isPassword={true}
              onChangeText={(text) => handleOnchange(text, "password")}
              error={errors?.password}
              onFocus={() => handleError(null, "password")}
              value={inputs.password}
            />

            <Components.InputField
              label={I18n.t("Confirm_Password")}
              placeholder={". . . . . . . ."}
              isPassword={true}
              onChangeText={(text) => handleOnchange(text, "confirmPassword")}
              error={errors.confirmPassword}
              onFocus={() => handleError(null, "confirmPassword")}
              value={inputs.confirmPassword}
            />

            <Components.SizedBox verticalSpace={3} />

            <Components.Button
              buttonLabel={I18n.t("Signup_here")}
              onPress={validation}
              style={styles.button}
              isLoading={isLoading}
            />

            <Components.SizedBox verticalSpace={7} />
          </View>


        </KeyboardAwareScrollView >
      </Components.SafeAreaContainer>
    </View >
  );
}

export default SignUpScreen

