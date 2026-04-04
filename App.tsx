import React, {Component, useEffect} from 'react';
import {Provider} from 'react-redux';
 

import {PersistGate} from 'redux-persist/integration/react';

import ErrorBoundary from 'react-native-error-boundary';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
 
 
import {CopilotProvider} from 'react-native-copilot';
 
const {width, height} = Dimensions.get('window');
import {GestureHandlerRootView} from 'react-native-gesture-handler';
 
 
import RootStack from './src/navigators/RootStack';
import store, { persistor } from './src/redux/store/Store';
import { Colors, Fonts } from './src/constants';
 


const CustomFallback = (props: {error: Error, resetError: Function}) => (
  <View style={styles.content}>
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.subtitle}>{"There's an error"}</Text>
    <Text style={styles.error} />
    <TouchableOpacity style={styles.button} onPress={props.resetError}>
      <Text style={styles.signin}>Try again</Text>
    </TouchableOpacity>
  </View>
);

function App() {

 

 

  return (

    <GestureHandlerRootView style={{flex: 1, }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <CopilotProvider>
    
         <StatusBar barStyle="light-content" backgroundColor="#FE9F6A"/>
             
       <RootStack />
        
           
            </CopilotProvider>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>

  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.BLUR_COLOR,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
    color: Colors.PRIMARY_COLOR,
    marginTop: height * 0.3,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.PRIMARY_COLOR,
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#4E3BAD',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signin: {
    fontFamily: Fonts.INTER_BOLD,
    fontSize: 14,
 
    color: '#FFFFFF',
    textAlign: 'center',
    paddingRight: 15,
  },
});



