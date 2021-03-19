import React, {useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View, AsyncStorage } from 'react-native'
import axios from 'axios';
import host from '../host';

import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../action/user';


const LoadingSreen = ({navigation}) => {
   const dispatch = useDispatch();
   const user = useSelector(state=>state)
      const handleChangePage = async () =>{
      
         const welcome_val = await AsyncStorage.getItem('Welcome')
         const login_val = await AsyncStorage.getItem('Login')
         const token_val = await AsyncStorage.getItem('Token')
         // console.log(token_val);
         // console.log(login_val);

         // if(welcome_val) {
         //    if(login_val) {
         //       const user = await axios.post(`${host}/user/getDataById`, { id: login_val })
         //       dispatch(addUser(user.data))
         //       navigation.replace('Home')
         //    } else {
         //       navigation.replace('Login')
         //    }
         // } else {
         //    navigation.replace('Onboarding')
         // }
         
         if (welcome_val){
            if (token_val){
               const user = await axios.get(`${host}/user/getDataById`,{
                  headers: {
                     Authorization: `Bearer ${token_val}`,
                   },
               })
               dispatch(addUser(user.data))
               navigation.replace('Home')
            }else{
               navigation.replace('Login')
            }
         }else {
            navigation.replace('Onboarding')
         }



      }

      useEffect(()=>{
         const timer = setInterval(() =>{
            handleChangePage()
            clearInterval(timer)
            // console.log(AsyncStorage.getItem('Token'));
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