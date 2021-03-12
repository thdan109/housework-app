import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, AppRegistry,AsyncStorage, View ,KeyboardAvoidingView} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { name as appName} from './app.json';

import configureStore from './store/store';
import OnboardingScreen from './screens/OnboardingScreens';
import LoginScreen from './screens/LoginScreen';
import IndexScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import UpdateProfileUser from './screens/UpdateProfileUser'

const store = configureStore();
const AppStack = createStackNavigator();
const handleRedux = () => {

   // const [statewelcome, setWelcome] = React.useState(false)
   // React.useEffect(()=>{
   //    Store()
   // },[])
   // const Store = ()=>{
   //    const welcome = AsyncStorage.getItem('Welcome')
   //    setWelcome(welcome)
   // }

   return (
         <Provider store={store}>
            <NavigationContainer >            
                  <AppStack.Navigator initialRouteName='Loading' headerMode='none'>
                  <AppStack.Screen name="Onboarding"  component={OnboardingScreen} />
                  <AppStack.Screen name="Loading" component={LoadingScreen}/>
                  <AppStack.Screen name="Login" component={LoginScreen} />
                  <AppStack.Screen name="Signup" component={RegisterScreen} />
                  <AppStack.Screen name="Home" component={IndexScreen} />   
                  <AppStack.Screen name="UpdateProfileUser" component={UpdateProfileUser}  /> 
                  {/* <App.Screen name="Test" component={TestScreen} /> */}
               </AppStack.Navigator>
            </NavigationContainer>
         </Provider>    
        
   )
}

AppRegistry.registerComponent(appName, () => handleRedux);

export default handleRedux

