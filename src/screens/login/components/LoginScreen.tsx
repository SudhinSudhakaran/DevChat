import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import { Components } from '../../../components'
import styles from './LoginScreen.styles'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { useFocusEffect } from '@react-navigation/native'
import I18n from '../../../i18n'
import { useEncrypt } from '../../../hooks/useEncrypt'
import { Helper } from '../../../helpers/helper/Helper'
import { navigate } from '../../../utils/NavigationUtils'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../../firebase/firebaseConfig'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setIsUserIsLoggedIn, setUserDetails } from '../../../redux/slices/useDetails/userSlice'
import Toast from 'react-native-simple-toast';
import { checkErrorMessage } from '../../../helpers/errorHandler/checkErrorMessage'


const LoginScreen = () => {
 const dispatch = useDispatch()
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  useFocusEffect(
    React.useCallback(() => {
      setInputs({ email: "", password: "" });

      setErrors({ email: "", password: "" });
      return () => {
        // setInputs({email: '', password: ''});
      };
    }, [])
  );

  const handleOnchange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validation = () => {
    Keyboard.dismiss();
    let isValidEmail = 0;
    let isValidPassword = 0;

    if (Helper.isEmpty(inputs?.email)) {
      handleError(I18n.t("Email_Cant_Empty"), "email");

      isValidEmail = 0;
    } else if (!Helper.isValidEmail(inputs?.email)) {
      handleError("Enter a valid email", "email");

      isValidEmail = 0;
    } else {
      handleError("", "email");
      isValidEmail = 1;
    }
    if (Helper.isEmpty(inputs?.password)) {
      handleError(I18n.t("Password_Cant_Empty"), "password");
      isValidPassword = 0;
    } else if (inputs?.password?.trim().length < 6) {
      handleError("Password must be 6 characters", "password");
      isValidPassword = 0;
    } else {
      handleError("", "password");
      isValidPassword = 1;
    }

    if (isValidEmail === 1 && isValidPassword === 1) {
      let data = {
        ...inputs,
        fbgoogle: 0,
        encryptedEmail: useEncrypt(inputs.email),
        encryptedPassword: useEncrypt(inputs.password),
      };

      handleLogin(data);
    }
  };

 const handleLogin = async (data: any) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    console.log("User logged in successfully:", response.user);
    getUserDetails(response.user.uid);

  } catch (error: any) {
    console.log("Error logging in:", error);

    checkErrorMessage(error);
 
  }
};

const getUserDetails = async(userId: string) => {
  // TODO: Implement get user details
 

  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
   dispatch(setUserDetails(data));
   dispatch(setIsUserIsLoggedIn(true))
   navigate("HomeStack")
  } else {
    console.log("No such document!");
  }

}





  const signUpAction = () => {
    navigate("SignUp")
  };

  return (
    <Components.Background>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={20}
            contentContainerStyle={{ flexGrow: 1 }}
          >
      <Components.SizedBox verticalSpace={20} />
      <Components.Logo
        animationStyle={{
          width: responsiveWidth(50),
          height: responsiveWidth(50)
        }} />
        <Components.SizedBox verticalSpace={2} />
      <View style={styles.formContainer} >
        <Components.SizedBox verticalSpace={2} />
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
          error={errors.password}
          onFocus={() => handleError(null, "password")}
          keyboardType="default"
          value={inputs.password}
        />
        <Components.SizedBox verticalSpace={6} />

        <Components.Button buttonLabel="Login" onPress={validation} />
        <Components.SizedBox verticalSpace={4} />
        <Components.RtlContainer style={styles.signUpContainer}>
        <Components.Label label={I18n.t("Dont_have_an_account")} />

          <Components.SizedBox horizontalSpace={2} />
          <Components.Label
            label={I18n.t("Signup_here")}
            style={styles.signUpText}
            onPress={signUpAction}
          />

        </Components.RtlContainer>



      </View>
      </KeyboardAwareScrollView>
    </Components.Background>
  )
}

export default LoginScreen

