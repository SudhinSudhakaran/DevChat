import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../constants';

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />


      <View style={styles.childrenContainer} >
        {children}
      </View>

    </View>
  )
}

export default Background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
  },

  childrenContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  }
})