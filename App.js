import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, AppRegistry,AsyncStorage, View ,KeyboardAvoidingView} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { name as appName} from './app.json';

import configureStore from './store/store';

//customer
import OnboardingScreen from './screens/OnboardingScreens';
import LoginScreen from './screens/LoginScreen';
import IndexScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import UpdateProfileUser from './screens/UpdateProfileUser'
import CookingScreen from './screens/ServicesScreen/CookingScreen'
import ClearScreen from './screens/ServicesScreen/ClearScreen'
import WashingScreen from './screens/ServicesScreen/WashingScreen'

//staff
import NavigatorStaff from './screens/staff/NavigatorStaff'
import HomeStaff from './screens/staff/HomeStaff'
import LoginStaff from './screens/staff/LoginStaffScreen'

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
                  <AppStack.Screen name="CookingScreen" component={CookingScreen} />
                  <AppStack.Screen name="ClearScreen" component={ClearScreen} />
                  <AppStack.Screen name='WashingScreen' component={WashingScreen} />
                  {/* <App.Screen name="Test" component={TestScreen} /> */}
                  <AppStack.Screen name='NavigatorStaff' component={NavigatorStaff} />
                  <AppStack.Screen name='HomeStaff' component={HomeStaff} />
                  <AppStack.Screen name='LoginStaff' component={LoginStaff} />
               </AppStack.Navigator>
            </NavigationContainer>
         </Provider>    
        
   )
}

AppRegistry.registerComponent(appName, () => handleRedux);

export default handleRedux

