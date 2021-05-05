import React from 'react';
import { View, Text, Button, StyleSheet, FlatList,Image, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import host from '../../host'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Moment from 'moment'

// const Messages = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: require('../../assets/users/user-1.jpg'),
//     messageTime: '4 mins ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
//     userImg: require('../../assets/users/user-2.jpg'),
//     messageTime: '2 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   }
  
  
// ];

   
const MessagesListCustomerScreen = ({navigation}) => {

   const [ dataChat, setDataChat ] = React.useState()
   const user = useSelector(state => state)

   React.useEffect(()=>{
      getListChat()
   },[])

   const getListChat = async() =>{
      const idUser = user.users.data._id
      const ListChat = await axios.post(`${host}/chat/listChatUser`,{
         id: idUser
      })
      if (ListChat !== null){
         setDataChat(ListChat.data)
      }else{
         console.log('Loi~');
      }
   }
   return (
      <View style={styles.container}>
         <View styles={styles.header}>
            <StatusBar  />
            <View style={{flexDirection:'row', backgroundColor: '#043927', paddingHorizontal: 10, height: 110}}>
               <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                  <Ionicons name="chevron-back" size={36} color="white" style={{opacity: 0}}/>
               </TouchableOpacity>
               
               <Text style={{flex: 1,color:'white',fontWeight:'bold', fontSize: 21, textAlign:"center", marginTop: 30}}>Trò chuyện</Text>

               <Ionicons name="chevron-back" size={36} color="white" style={{opacity: 0}}/>
            </View>
         </View>
         
         <View style={styles.showList} >
            <View style={styles.List}>
               <FlatList 
                     
                     data={dataChat}
                     keyExtractor={(item,index)=>item._id}
                     renderItem={({item}) => (
                        <TouchableOpacity onPress ={
                              ()=> navigation.navigate('MessagesCustomer',{idRoom: item._id, Username: item.idUser.fullname, Title: item.date}) 
                        }>
                           <View style={styles.inforMess}>
                              <View style={styles.left}>
                                 <Image  style={styles.img} source={{uri: `${host}/${item.idStaff[0].avatarStaff}` }} />
                              </View>
                              
                              <View style={styles.right}>
                                 <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15}} >{item.type}</Text>
                                    {/* <Text style={{flex:1, textAlign: "right", fontSize: 15}}>aaaaaaaaaaaaaaa</Text> */}
                                 </View>
                                 <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15}} >{Moment(item.date).format('dddd  DD/MM/YYYY')}</Text>
                                    <Text style={{flex:1, textAlign: "right", fontSize: 15}}>{item.messageTime}</Text>
                                 </View>
                                 {/* <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15}} >Tên KH</Text>
                                    <Text style={{flex:1, textAlign: "right", fontSize: 15}}>{item.userName}</Text>
                                 </View> */}
                              </View>
                           </View>
                        </TouchableOpacity>
                     )}
                  />
            </View>
         </View>
         
      </View>
   );
};

export default MessagesListCustomerScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      backgroundColor: '#D3D3D3'
   },
   showList:{
      marginTop: -20,
      backgroundColor: '#D3D3D3',
      borderRadius: 20
      // marginVertical: 20,
      // marginHorizontal: 5
   },
   List:{
      marginVertical: 20,
      marginHorizontal: 10
   },
   inforMess:{
      borderRadius: 10,
      backgroundColor: "#FFFAFA",
      flexDirection: 'row',
      height: 110,
      // borderWidth:1,
      marginBottom: 10
   },
   left:{
     width: '27%',
     justifyContent: 'center',
   //   borderWidth: 1 ,   
     alignItems:'center'
   },
   right:{
      flex:1,
      padding: 10
   },
   img:{
      borderRadius: 40,
      height: 80,
      width: 80
   }
});