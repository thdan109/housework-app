import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View, AsyncStorage } from 'react-native'
import axios from 'axios';
import host from '../host';

import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../action/user';


const LoadingSreen = ({navigation}) => {
   const dispatch = useDispatch();
      const handleChangePage = async () =>{
      
         const valueWelcome = await AsyncStorage.getItem('Welcome')
         const valueLogin = await AsyncStorage.getItem('Login')
         if(valueWelcome) {
            if(valueLogin) {
               const user = await axios.post(`${host}/user/getDataById`, { id: valueLogin })
               dispatch(addUser(user.data))
               navigation.replace('Home')
            } else {
               navigation.replace('Login')
            }
         } else {
            navigation.replace('Onboarding')
         }
         
      }
      useEffect(()=>{
         const timer = setInterval(() =>{
            handleChangePage()
            clearInterval(timer)
         },3800)
      },[])
     
      return (
         <View style={{flex:1,  justifyContent: 'center'}}>
            <View style={{flex: 1/3}}>
               <LottieView
                  source={require('../assets/dots.json')}
                  autoPlay
                  loop
               />

            </View>
         </View>
      ) ;
  }

  export default LoadingSreen