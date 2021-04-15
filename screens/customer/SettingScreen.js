import axios from 'axios';
import  React from 'react';
import { View , TouchableOpacity, Text, Dimensions, AsyncStorage } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
const { width, height } = new Dimensions.get('screen');
import host from '../../host/index';



const SettingScreen = ({ navigation }) =>{

   const handleSignOut = async() =>{
      const token_val = await AsyncStorage.getItem('Token')
      const logout = await axios.get(`${host}/user/logout`,{
         headers: {
            Authorization: `Bearer ${token_val}`
         }
      })
      console.log(logout.data);
      await AsyncStorage.removeItem("Token")
      navigation.replace("Login")
   }

   return(
      <View style={{
         flex: 1
      }}>
         {/* <Address/> */}
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

export default SettingScreen;