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
import OnboardingScreen from './screens/customer/OnboardingScreens';
import LoginScreen from './screens/customer/LoginScreen';
import IndexScreen from './screens/customer/HomeScreen';
import RegisterScreen from './screens/customer/RegisterScreen';
import LoadingScreen from './screens/customer/LoadingScreen';
import UpdateProfileUser from './screens/customer/UpdateProfileUser'
import CookingScreen from './screens/ServicesScreen/CookingScreen'
import ClearScreen from './screens/ServicesScreen/ClearScreen'
import WashingScreen from './screens/ServicesScreen/WashingScreen'
import ScanQRScreen from './screens/customer/ScanQRScreen'
import TestScreen from './screens/customer/TestScreen'
import MessagesCustomerScreen from './screens/customer/MessagesCustomerScreen'
import MessagesListCustomerScreen from './screens/customer/MessagesListCustomerScreen'
import NotificationScreen from './screens/customer/NotificationScreen'
import HistoryScreen from './screens/customer/HistoryScreen'
import VoucherScreen from './screens/customer/VoucherScreen'
import ShowFeedBackScreen from './screens/customer/ShowFeedBackScreen';
// import TestScreen from './screens/customer/TestScreen'

//staff
import NavigatorStaff from './screens/staff/NavigatorStaff'
import HomeStaff from './screens/staff/HomeStaff'
import LoginStaff from './screens/staff/LoginStaffScreen'
import ProfileStaff from './screens/staff/ProfileStaff';
import FormForLeave from './screens/staff/FormForLeave'
import WorkStaffAll from './screens/staff/WorkStaffScreen'
import MessagesListStaff from './screens/staff/MessagesListStaffScreen'
import MessagesStaffScreen from './screens/staff/MessagesStaffScreen'
import NotificationStaffScreen from './screens/staff/NotificationStaffScreen'
import SalaryStaffScreen from './screens/staff/SalaryStaffScreen'
import RateStaff from './screens/staff/RateStaffScreen'


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
                  {/* <AppStack.Screen name="Test" component={TestScreen} /> */}
                  <AppStack.Screen name="Onboarding"  component={OnboardingScreen} />
                  <AppStack.Screen name="Loading" component={LoadingScreen}/>
                  <AppStack.Screen name="Login" component={LoginScreen} />
                  <AppStack.Screen name="Signup" component={RegisterScreen} />
                  <AppStack.Screen name="Home" component={IndexScreen} />     
                  <AppStack.Screen name="UpdateProfileUser" component={UpdateProfileUser}  /> 
                  <AppStack.Screen name="CookingScreen" component={CookingScreen} />
                  <AppStack.Screen name="ClearScreen" component={ClearScreen} />
                  <AppStack.Screen name='WashingScreen' component={WashingScreen} />
                  <AppStack.Screen name='ScanQRScreen' component={ScanQRScreen} /> 
                  <AppStack.Screen name='TestScreen' component={TestScreen} />
                  <AppStack.Screen name='MessagesCustomer' component={MessagesCustomerScreen} />
                  <AppStack.Screen name='MessagesListCustomer' component={MessagesListCustomerScreen}/>
                  <AppStack.Screen name='NotificationScreen' component={NotificationScreen}/>
                  <AppStack.Screen name='HistoryScreen' component={HistoryScreen}/>
                  <AppStack.Screen name='VoucherScreen' component={VoucherScreen}/>
                  <AppStack.Screen name='ShowFeedBackScreen' component={ShowFeedBackScreen}/>
                  {/* <App.Screen name="Test" component={TestScreen} /> */}
                  <AppStack.Screen name='RateStaffScreen' component={RateStaff} />
                  <AppStack.Screen name='NavigatorStaff' component={NavigatorStaff} />
                  <AppStack.Screen name='HomeStaff' component={HomeStaff} />
                  <AppStack.Screen name='LoginStaff' component={LoginStaff} />
                  <AppStack.Screen name='ProfileStaff' component={ProfileStaff} />
                  <AppStack.Screen name='FormForLeave' component={FormForLeave} />
                  <AppStack.Screen name='WorkStaffAll' component={WorkStaffAll} />
                  <AppStack.Screen name='MessagesListStaff' component={MessagesListStaff} />
                  <AppStack.Screen name='MessagesStaff' component={MessagesStaffScreen} />
                  <AppStack.Screen name='NotificationStaff' component={NotificationStaffScreen} />
                  <AppStack.Screen name='SalaryStaffScreen' component={SalaryStaffScreen} />
               </AppStack.Navigator>
            </NavigationContainer>
         </Provider>    
        
   )
}

AppRegistry.registerComponent(appName, () => handleRedux);

export default handleRedux

