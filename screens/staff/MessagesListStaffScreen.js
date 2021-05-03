import React from 'react';
import { View, Text, Button, StyleSheet, FlatList,Image, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import host from '../../host'
import {useSelector} from 'react-redux'


const Messages = [

   {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../../assets/users/user-1.jpg'),
      messageTime: '4 mins ago',
      messageText:
         'Hey there, this is my test for a post of my social app in React Native.',
   },
   {
      id: '2',
      userName: 'John Doe',
      userImg: require('../../assets/users/user-2.jpg'),
      messageTime: '2 hours ago',
      messageText:
         'Hey there, this is my test for a post of my social app in React Native.',
   }
  
  
];

const MessagesListStaffScreen = ({navigation}) => {

   const [ dataChat, setDataChat ] = React.useState()
   const staff = useSelector(state => state)

   React.useEffect(()=>{
      getListChat()
   },[])

   const getListChat = async() =>{
      const idStaff = staff.users.data._id
      const ListChat = await axios.post(`${host}/chat/listChat`,{
         id: idStaff
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
               <View style={{flexDirection:'row', backgroundColor: '#808000', alignItems: 'center', paddingHorizontal: 10}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="chevron-back" size={36} color="white" />
                  </TouchableOpacity>
                  
                  <Text style={{flex: 1,color:'white',fontWeight:'bold', fontSize: 21, textAlign:"center"}}>Trò chuyện</Text>
                  <TouchableOpacity>
                     <Ionicons name="refresh-circle" size={36} color="white" />
                  </TouchableOpacity>
                  
               </View>
            </View>
            <View style={styles.showList} >
               <FlatList 
                  data={dataChat}
                  keyExtractor={item=>item._id}
                  renderItem={({item}) => (
                     
                     <TouchableOpacity onPress ={()=> navigation.navigate('MessagesStaff') }>
                        <View style={styles.inforMess}>
                           <View style={styles.left}>
                              <Image style={styles.img} source={{uri: `${host}/${item.idUser.avatar}` }} />
                           </View>
                           <View style={styles.right}>
                              {/* <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontWeight: 'bold', fontSize: 15}} >Ngày</Text>
                                 <Text style={{flex:1, textAlign: "right", fontSize: 15}}>aaaaaaaaaaaaaaa</Text>
                              </View> */}
                             
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{marginTop: 15 ,fontWeight: 'bold', fontSize: 18}} >{item.nameUser}</Text>
                                 {/* <Text style={{flex:1, textAlign: "right", fontSize: 15}}>{item.nameUser}</Text> */}
                              </View>
                              <View style={{flexDirection: 'row', marginTop: 18}}>
                                 <Text style={{fontSize: 15, color: 'gray', fontStyle: 'italic'}} >Vài ba tin:</Text>
                                 <Text style={{flex:1, textAlign: "right", fontSize: 15}}>{item.messages}</Text>
                              </View>
                           </View>
                           
                           
                        </View>
                     </TouchableOpacity>
                  )}
               />
            </View>
            
         </View>
    );
};

export default MessagesListStaffScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      backgroundColor: '#D3D3D3'
   },
   showList:{
       marginVertical: 20,
       marginHorizontal: 5
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