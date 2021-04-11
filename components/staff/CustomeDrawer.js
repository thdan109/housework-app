import React from 'react'
import {View, Text, Dimensions,Alert, StyleSheet} from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';


const CustomDrawer = ({ navigtion, ...props}) =>{

   return(
      <View>
         <View  style={{ flexDirection: 'row', flex:0, height: '9%', marginVertical: 20}}>
               <View style={styles.avatar} />
               <View style={styles.inforStaff} >
                  <Text>aaaaaaaaaa</Text>
                  <Text>aaaaaaaaaa</Text>
               </View>
         </View>
         <View style={{flex: 0, height: '77%'}}>
            <DrawerContentScrollView {...props} >
               <DrawerItemList {...props} />
               <DrawerItem
                  label='About us'
                  onPress={()=>Alert.alert('aaaaaaa')}
               />
            </DrawerContentScrollView>
         </View>
         <View style={{
            flex:0,
            height: '9%'
         }}>
            <DrawerContentScrollView {...props}>
               <DrawerItem 
                  label="Đăng xuất"
                  icon={() => <MaterialIcons name="logout" size={24} color="black" />}
               />
            </DrawerContentScrollView>
         </View>

      </View>
      
   )

}
export default CustomDrawer

const styles = StyleSheet.create({

   avatar: {
      width: 82,
      height: 82,
      borderRadius: 40,
      borderWidth: 1,
      marginLeft: 20
   },
   inforStaff:{
      marginLeft: 10
   }
})