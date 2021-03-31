import React from 'react';
import {View, Text, KeyboardAvoidingView, Dimensions, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileUser from './ProfileUser';
import HomeChild from './HomeScreenChild'
import SettingScreen from './SettingScreen'
import AddressSelected from '../components/AddressSelected';
import OrderScreen from '../screens/OrderScreen'
const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get("screen")

const Chat = () =>{
   return(
      <View style= {{flex: 1, justifyContent: "center", alignItems: "center"}}> 
         <Text>Không có cuộc trò chuyện nào</Text>
      </View>
   )
}
 const Home = () => {
    return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text> Home</Text>
       </View>
    )
 }

 const Notification = () =>{
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Không có thông báo</Text>
      </View>
   )
}



const IndexScreen = () => {

   return (    
         <Tab.Navigator
            tabBarOptions= {{
               keyboardHidesTabBar: true
            }}
          >
            <Tab.Screen name="Home" component={HomeChild} 
                        options={{
                           tabBarLabel: 'Home',
                           tabBarIcon: ({ color, size }) => (
                                 <MaterialCommunityIcons name="home" color={'#043927'} size={size} />
                           ),
                        }}
            />
            <Tab.Screen name="Order" component={OrderScreen} 
                        options={{
                           tabBarLabel: 'Việc',
                           tabBarIcon: ({ color, size }) => (
                              <Ionicons name="list-sharp" size={size} color="#043927" />
                           ),
                        }}
            />
            <Tab.Screen name="Account" component={ProfileUser} 
                        options={{
                           tabBarLabel: 'Account',
                           tabBarIcon: ({ color, size }) => (
                                 <MaterialCommunityIcons name="account-alert" color={'#043927'} size={size} />
                           ),
                        }}
            />
            <Tab.Screen name="Notification" component={AddressSelected} 
                        options={{
                           tabBarLabel: 'Notification',
                           tabBarIcon: ({ color, size }) => (
                              <MaterialIcons name="circle-notifications" color={'#043927'} size={30} />
                           ),
                        }}
            />

            {/* <Tab.Screen name="Setting" component={SettingScreen} 
                        options={{
                           tabBarLabel: 'Setting',
                           tabBarIcon: ({ color, size }) => (
                              <MaterialIcons name="settings" color={'#043927'} size={30} />
                           ),
                        }}
            /> */}
         </Tab.Navigator>  
   )
}


export default IndexScreen;


