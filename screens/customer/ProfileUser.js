import React from 'react';
import { View, Text, StatusBar, Dimensions, Button , AsyncStorage, TouchableOpacity, Modal, StyleSheet, Pressable, TextInput,Image, TextInputBase} from 'react-native';
import {Entypo, FontAwesome, MaterialIcons, Ionicons, FontAwesome5 } from 'react-native-vector-icons'
const {width, height} = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../action/user';
import Moment from 'moment';
import { abs } from 'react-native-reanimated';
import host  from '../../host/index'
import axios from 'axios';



const  ProfileUser= ({ navigation }) => {
   const user = useSelector(state => state)
   // const dispatch = useDispatch();
   //State modal
   const [modalVisible, setModalVisible] = React.useState(false);
   
   React.useEffect(()=>{
      // console.log(user);
      // getProfile()
   },[])

   const handleSignOut = async() =>{
      const token_val = await AsyncStorage.getItem('Token')
      const logout = await axios.get(`${host}/user/logout`,{
         headers: {
            Authorization: `Bearer ${token_val}`
         }
      })
      // console.log(logout.data);
      await AsyncStorage.removeItem("Token")
      navigation.replace("Login")
   }

   return (
      
     <View style={{ flex: 1, backgroundColor: "rgb(230, 230, 230)"}}>
        <StatusBar />
         <View style={{ flexDirection: 'row', borderWidth: 0, alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center',   backgroundColor: '#043927'  }}>
            <Text style={{ opacity: 0 }}>
               A
            </Text>
            <View style={{ flex: 1, alignItems: 'center',marginTop: 20}}>
               <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white',}}>Tài khoản</Text>
            </View>
         
            <Text style={{ opacity: 0 }}>
               A
            </Text>
           
         </View>
         <View style={{ height: height / 6, backgroundColor:"#043927"}}>

         </View>
         <View style={{flex: 1/1.2, marginHorizontal: 15, marginTop: -90, borderRadius: 10, backgroundColor: "white"}}>  
            <View 
               style={{
                     flexDirection: "row", 
                     width:width / 1.08,
                     height: height / 10, 
                     marginTop: 10 
               }}
            >
               <View style={{ justifyContent: "center",width: width / 4, height: height/10, borderWidth:0  }}>
                  <View style={{backgroundColor: "#043927",  width: 80, height: 80, borderWidth: 0, borderRadius: 40,marginLeft: 20}}>
                     <Image source={{uri: `${host}/${user.users.data.avatar}` }} style={{ flex: 1,  borderRadius: 80}} />
                  </View>
               </View>
               
               <View 
                  style={{ 
                     width: width/1.85 , 
                     justifyContent: "center", 
                     marginLeft: 10 ,
                  }}
               >
                     <Text style={{fontSize: 18, fontWeight: 'bold'}} >
                        {user.users.data.fullname}
                     </Text>
                     <Text style={{fontSize: 14, fontStyle: "italic"}}>{user.users.data.email}</Text>
               </View>
               
               <View style={{
                  justifyContent: 'center',
               }}>
                  <TouchableOpacity onPress={()=> navigation.navigate('UpdateProfileUser')}>
                     <FontAwesome5  name="edit" size={25} color="#043927" />
                  </TouchableOpacity>
                
               </View>
               
            </View>
            
            <View style={{ height: height/2.5, borderWidth: 0, paddingHorizontal: 0, marginTop: 60, marginHorizontal: 10, backgroundColor: 'rgb(230,230,230)'}}>
               {/* <View style={{flexDirection: "row",alignItems: "flex-end",paddingVertical: 3, flex: 1/10, backgroundColor: 'white', borderWidth: 0,marginVertical:1,marginHorizontal: 3, paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <Entypo name="medal" size={16} color="#043927" style={{marginRight: 2}} />
                  <Text style={{ flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Xếp loại khách hàng</Text>
                  <Text style={{  }}>KC</Text> 
               </View>   */}

               <View style={{
                     paddingTop: 20,
                     alignItems: "flex-end",paddingVertical: 8, 
                     flex: 1/10 , backgroundColor: 'white', 
                     borderWidth: 0,marginVertical:20,marginHorizontal: 3,  
                     paddingHorizontal: 7, borderBottomWidth: 1 }}
               >
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress = {() => navigation.navigate('HistoryScreen')} >
                     <FontAwesome name="history" color="#043927" size={22} style={{marginRight: 5, marginLeft: 1}} />
                     <Text style={{ flex:1, marginLeft: 0,fontSize: 18, fontWeight: "bold"}} >Lịch sử</Text>
                  </TouchableOpacity>
               </View>
 
               <View style={{
                        flexDirection: "row", 
                        paddingTop: 20,
                        alignItems: "flex-end",paddingVertical: 5 , 
                        flex: 1/10 , backgroundColor: 'white', 
                        borderWidth: 0,marginVertical:0,
                        marginHorizontal: 3, paddingHorizontal: 7, 
                        borderBottomWidth: 1 }}
                        >
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>navigation.navigate('VoucherScreen')}>
                     <Ionicons name="gift" size={22} color="#043927" style={{marginRight: 3, marginLeft: 1}} />
                     <Text style={{flex:1, marginLeft: 0,fontSize: 18, fontWeight: "bold", paddingBottom: 3}} >Khuyến mãi</Text>
                  </TouchableOpacity>
               </View>
               <View style={{
                        flexDirection: "row", 
                        paddingTop: 20,
                        alignItems: "flex-end",paddingVertical: 5 , 
                        flex: 1/10 , backgroundColor: 'white', 
                        borderWidth: 0,marginTop: 20,
                        marginHorizontal: 3, paddingHorizontal: 7, 
                        borderBottomWidth: 1 }}
                        >
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>navigation.navigate('ShowFeedBackScreen')} >
                     <Ionicons name="star" size={22} color="#043927" style={{marginRight: 3, marginLeft: 1}} />
                     <Text style={{flex:1, marginLeft: 0,fontSize: 18, fontWeight: "bold", paddingBottom: 3}} >Đánh giá</Text>
                  </TouchableOpacity>
               </View>
               
              
               
               {/* <View style={{flexDirection: "row", alignItems: "flex-end",paddingVertical: 3, flex: 1/10 , backgroundColor: 'white', borderWidth: 0, marginVertical:0, paddingHorizontal: 7,marginHorizontal: 3, borderBottomWidth: 1 }}>
                  <Entypo name="man" size={18} color="#043927" style={{marginRight: 3}} />
                  <Text style={{ flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Người làm yêu thích</Text>
               </View> */}

               
              
           
            </View>
           
         </View>
        
            <View style={{ height: height/11, borderWidth: 0, marginTop: 60, justifyContent: "center", alignContent:"center", bottom: 0, position: 'absolute' }}>
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
   );
 }




export default ProfileUser;
