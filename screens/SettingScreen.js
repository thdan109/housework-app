import React from 'react'
import { View, Text, AsyncStorage, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import {MaterialIcons} from 'react-native-vector-icons'

const {width, height} = Dimensions.get('screen')

const Setting = ({navigation}) =>{

   const handleSignOut = async() => {
      await AsyncStorage.removeItem("Login")
      navigation.replace("Login")
   }

   return(
      <View 
         style={{
            flex: 1,
            borderWidth: 1, 
            position: 'absolute',
            bottom: 0
         
         }}
      >  
        
        
         <View style={{ height: height/11, borderWidth: 0, marginTop: 30, justifyContent: "center", alignContent:"center", borderWidth: 0, bottom: 0, position: 'absolute' }}>
            <View>
               <TouchableOpacity
                  onPress={handleSignOut}
               >
                  <View style={{flexDirection: "row", alignItems: "center" ,borderWidth: 0, width: width / 2}}>
                     <MaterialIcons name="logout" size={30} style={{marginLeft: 25}} color="#043927" />
                     <Text style={{ marginHorizontal: 10, paddingVertical: 10, fontSize: 18, fontWeight: "800"}}>Đăng xuất</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>

      </View>
   )

}
export default Setting;