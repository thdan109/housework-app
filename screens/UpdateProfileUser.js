import React from 'react';
import {View, Text, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const {width, hieght} = Dimensions.get('screen')

const UpddateProfileUser = ({navigation}) =>{


   return(
     
      <View style={{
         flex: 1,
      }}>
         <StatusBar backgroundColor='black'/>
         <View style={{
            flex: 1,
            backgroundColor: 'green',
         }}>

            <View style={{
                  flex: 1/19,
                  flexDirection: 'row',
                  backgroundColor: 'rgb(230,230,230)',
                  justifyContent:"center",
                  alignItems: 'center'
            }}> 
               <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                  <View style={{
                     marginLeft: 10
                  }}>
                     <Ionicons name="chevron-back" size={34} color="#043927" />
                  </View>
               </TouchableOpacity>

               <View style={{
                  flex: 1,
                  alignItems: 'center'
               }}>
                  <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Cập nhật thông tin</Text>
               </View>

               <View style={{
                  marginRight: 15,
                  opacity: 0
               }}>
                   <Ionicons name="arrow-back-circle" size={34} color="white" />
               </View>
            </View>


            <View style={{
               flex: 1,
               backgroundColor: 'red',
               justifyContent: 'center'
            }}>
               <View style={{
                  flex: 3.5/4,
                  backgroundColor: 'rgba(245,245,245,0.8)'
               }}>
                  <View style={{
                     
                  }}>
                     <Text>asdasd</Text>
                  </View>
               </View>

            </View>

         </View>

      </View>
   )
}

export default UpddateProfileUser;