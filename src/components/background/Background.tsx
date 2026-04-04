import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../constants';

const Background = ({children}) => {
  return (
  <View style={styles.container}>
   
   <View  style={styles.firstContainer} />
          <View  style={styles.secondContainer} />
          <View  style={styles.thirdContainer} />
          <View style={styles.forthContainer} />
          <View style={styles.childrenContainer} >
 {children}
          </View>
         
      </View>
  )
}

export default Background

const styles = StyleSheet.create({
  container:{
    flex:1,
  backgroundColor:Colors.BACKGROUND_COLOR
  },
  firstContainer:{
    height: responsiveScreenHeight(30),
    backgroundColor:'#ffffffa3',
    borderBottomLeftRadius: responsiveScreenWidth(50),
    borderBottomRightRadius: responsiveScreenWidth(0),
  },
  secondContainer:{
    height: responsiveScreenHeight(40),
    backgroundColor:'#0a344fa3',
    borderTopLeftRadius: responsiveScreenWidth(0),
    borderTopRightRadius: responsiveScreenWidth(50),
    borderBottomLeftRadius: responsiveScreenWidth(50),
    borderBottomRightRadius: responsiveScreenWidth(0),
        zIndex:8,
  },
  thirdContainer:{
    height: responsiveScreenHeight(30),
    backgroundColor:'#ffffffa3',
    borderBottomLeftRadius: responsiveScreenWidth(50),
    borderBottomRightRadius: responsiveScreenWidth(0),
 
  },
  forthContainer:{
    height: responsiveScreenHeight(40),
    width:responsiveScreenWidth(50),
    backgroundColor:'#035267e8',
    borderTopLeftRadius: responsiveScreenWidth(50),
    borderTopRightRadius: responsiveScreenWidth(0),
    borderBottomLeftRadius: responsiveScreenWidth(50),
    position:'absolute',
    zIndex:8,
    right:0,
    top: responsiveHeight(10),
  },
  childrenContainer:{
    flex:1,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:10,
  }
})