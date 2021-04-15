import React from 'react'
import {View, Text, Dimensions,Alert, StyleSheet,AsyncStorage, Image} from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import host from '../../host'
import {useSelector, useDispatch } from 'react-redux' 
import { addUser } from '../../action/user'

// import ProfileStaff from '../../screens/staff/ProfileStaff'


const CustomDrawer = ({ navigation, ...props}) =>{

   const staff = useSelector(state=>state) 
   const signoutStaff = async()=>{
      const tokenStaff_val = await AsyncStorage.getItem('TokenStaff')
      const logout = await axios.get(`${host}/staff/logout`,{
         headers: {
            Authorization: `Bearer ${tokenStaff_val}`
         }
      })
      await AsyncStorage.removeItem("TokenStaff")
      navigation.replace("LoginStaff")
   }
   return(
      <View>
         <LinearGradient colors={["#FFDEAD", "#FFFACD"]}>
            <View  style={{ flexDirection: 'row', flex:0, height: '9%', marginVertical: 20}}>
                  <View style={styles.avatar}>
                     <Image source={{uri: `${host}/${staff.users.data.avatarStaff}` }} style={{ flex: 1,  borderRadius: 80}} />
                  </View>
                  <View style={styles.inforStaff} >
                     <Text style={{fontWeight: 'bold', fontSize: 16}}>{staff.users.data.fullnameStaff}</Text>
                     <Text>{staff.users.data.department}</Text>
                  </View>
            </View>
         </LinearGradient>
         
         <View style={{flex: 0, height: '77%'}}>
            <DrawerContentScrollView {...props} >
               <DrawerItemList {...props} />
               <DrawerItem
                  label='Profile'
                  onPress={()=>navigation.replace('ProfileStaff')}
               />
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
                  onPress={()=>signoutStaff()}
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
      borderColor: 'green',
      marginLeft: 20
   },
   inforStaff:{
      marginLeft: 10,
      marginTop: 20
   }
})