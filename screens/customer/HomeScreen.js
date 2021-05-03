import React from 'react';
import {View, Text, KeyboardAvoidingView, Dimensions, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileUser from './ProfileUser';
import HomeChild from './HomeScreenChild'
import SettingScreen from './SettingScreen'
import AddressSelected from '../../components/AddressSelected';
import OrderScreen from './OrderScreen'
import TestScreen from './TestScreen'
import axios from 'axios'
import host from '../../host'
const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get("screen")
import {useDispatch, useSelector} from 'react-redux'
import { addWorkCooking, addWorkWashing, addWorkClear } from '../../action/workAction';


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

   const dispatch = useDispatch()
   const work = useSelector(state => state)

   React.useEffect( ()=>{
      getOrder()
   },[])
   const getOrder = async() =>{
      
      const token_val = await AsyncStorage.getItem('Token')
      
      
      const dataOrder = await axios.get(`${host}/user/getOrder`,{
         headers: {
            Authorization: `Bearer ${token_val}`,
         }
      })
      if (dataOrder.data.orderClear){      
         dispatch(addWorkClear(dataOrder.data.orderClear))
      }
      if (dataOrder.data.orderCooking){
         dispatch(addWorkCooking(dataOrder.data.orderCooking))
   
      }
      if (dataOrder.data.orderWashing){
         dispatch(addWorkWashing(dataOrder.data.orderWashing))
      }
   }

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
            <Tab.Screen name="Notification" component={TestScreen} 
                        options={{
                           tabBarLabel: 'Notification',
                           tabBarIcon: ({ color, size }) => (
                              <MaterialIcons name="circle-notifications" color={'#043927'} size={30} />
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


