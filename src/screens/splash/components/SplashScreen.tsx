import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
       
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
  }
})