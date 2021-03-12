import React from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileUser from './ProfileUser';
import HomeChild from './HomeScreenChild'
import Setting from './SettingScreen'
const Tab = createBottomTabNavigator();
const Chat = () =>{
   return(
      <View style= {{flex: 1, justifyContent: "center", alignItems: "center"}}> 
         <Text>Không có cuộc trò chuyện nào</Text>
      </View>
   )
}
// const  SettingsScreen=()=> {
//    return (
//      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//        <Text>Settings!</Text>
//      </View>
//    );
//  }
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
          >
            <Tab.Screen name="Home" component={HomeChild} 
                        options={{
                           tabBarLabel: 'Home',
                           tabBarIcon: ({ color, size }) => (
                                 <MaterialCommunityIcons name="home" color={'#043927'} size={size} />
                           ),
                        }}
            />
            <Tab.Screen name="Chat" component={Chat} 
                        options={{
                           tabBarLabel: 'Chat',
                           tabBarIcon: ({ color, size }) => (
                              <MaterialIcons name="chat" color={'#043927'} size={30} />
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
            <Tab.Screen name="Notification" component={Notification} 
                        options={{
                           tabBarLabel: 'Notification',
                           tabBarIcon: ({ color, size }) => (
                              <MaterialIcons name="circle-notifications" color={'#043927'} size={30} />
                           ),
                        }}
            />

            <Tab.Screen name="Setting" component={Setting} 
                        options={{
                           tabBarLabel: 'Setting',
                           tabBarIcon: ({ color, size }) => (
                              <MaterialIcons name="settings" color={'#043927'} size={30} />
                           ),
                        }}
            />
         </Tab.Navigator>   
      
   )
}


export default IndexScreen;


