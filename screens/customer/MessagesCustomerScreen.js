import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet,TouchableOpacity} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import host from '../../host'
import io from 'socket.io-client';
import {useSelector} from 'react-redux'
import Moment from 'moment'
import axios from 'axios'

let socket;

const MessagesCustomerScreen = ({navigation, route}) => {

   const user = useSelector(state => state)
   const idRoom = route.params.idRoom
   const Title = route.params.Title  
   const [messages, setMessages] = useState([]);
   
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//       {
//         _id: 2,
//         text: 'Hello world',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);
   React.useEffect(()=>{
      getDataChat()
   },[])
   const [ room, setRoom ] = React.useState()
   const [ name, setName ] = React.useState()

   const getDataChat = async()=>{
      try{
         socket = io.connect(host);
         const name =  user.users.data.fullname;
         const room = idRoom;
        
         const getMessages = await axios.post(`${host}/chat/oldMessages`, {
            idRoom: room
         })
         setMessages(getMessages.data.messages)

        
        
         setName(name);
         setRoom(room);

         socket.emit('join', { name, room });

         return () => {
         socket.emit('disconnect');
         socket.off();
         }
      } catch(error) {
         console.log(error);
      }
   }

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

   React.useEffect(() => {
      socket.on('message', (message) => {
      if(message.data[0].user._id !== user.users.data._id) {
         const mess = message.data[0]
         setMessages(previousMessages => GiftedChat.append(previousMessages, mess))
      }
      })
   }, []);
   
   const onSend = React.useCallback((messages = {}) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      socket.emit('sendMessage', messages);
   }, [])

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

   return (
      <View style={styles.container}>
         
         <View style={styles.header} >
            <View style={styles.statusBarHeader}>
               <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Ionicons name="chevron-back" size={36} color="white" />
               </TouchableOpacity>
               <Text style={{flex: 1,color:'white',fontWeight:'bold', fontSize: 19, textAlign:"center", paddingVertical: 5}}>{Moment(Title).format('dddd  DD/MM/YYYY')}</Text>
               <TouchableOpacity>
                  <Ionicons name="refresh-circle" size={36} color="white" style={{opacity: 0}} />
               </TouchableOpacity>
            </View>
            
         </View>

         <View style={styles.containerGiftedChat}>
            <GiftedChat
               messages={messages}
               onSend={(messages) => onSend(messages)}
               user={{
                  _id: user.users.data._id,
                  avatar: `${host}/${user.users.data.avatar}`
               }}
               renderBubble={renderBubble}
               alwaysShowSend
               renderSend={renderSend}
               scrollToBottom
               scrollToBottomComponent={scrollToBottomComponent}
            />
         </View>
         
      </View>
   );
};

export default MessagesCustomerScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      
   },
   header: {
         height: 36,
   },
   containerGiftedChat:{
      flex:1
   },
   statusBarHeader: {
      flexDirection:'row', 
      backgroundColor: '#2e64e5', 
      alignItems: 'center', 
      paddingHorizontal: 3,
   // paddingVertical: 10
   }
});