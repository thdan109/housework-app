import React from 'react';
import { View, Text, Button, StyleSheet, FlatList,Image, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    return (
      // <Container>
      //   <FlatList 
      //     data={Messages}
      //     keyExtractor={item=>item.id}

      //     renderItem={({item}) => (
      //       <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
      //         <UserInfo>
      //           <UserImgWrapper>
      //             <UserImg source={item.userImg} />
      //           </UserImgWrapper>
      //           <TextSection>
      //             <UserInfoText>
      //               <UserName>{item.userName}</UserName>
      //               <PostTime>{item.messageTime}</PostTime>
      //             </UserInfoText>
      //             <MessageText>{item.messageText}</MessageText>
      //           </TextSection>
      //         </UserInfo>
      //       </Card>
      //     )}
      //   />
      // </Container>
         <View style={styles.container}>
            <View styles={styles.header}>
               <StatusBar  />
               <View style={{flexDirection:'row', backgroundColor: '#808000', alignItems: 'center', paddingHorizontal: 10}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="chevron-back" size={36} color="white" />
                  </TouchableOpacity>
                  
                  <Text style={{flex: 1,color:'white',fontWeight:'bold', fontSize: 21, textAlign:"center"}}>Trò chuyện</Text>
                  <Ionicons name="chevron-back" size={36} color="white" style={{opacity: 0}}/>
               </View>
            </View>
            <View style={styles.showList} >
               <FlatList 
                  
                  data={Messages}
                  keyExtractor={item=>item.id}
                  renderItem={({item}) => (
                     <TouchableOpacity onPress ={()=> navigation.navigate('MessagesStaff') }>
                        <View style={styles.inforMess}>
                           <View style={styles.left}>
                              <Image style={styles.img} source={item.userImg} />
                           </View>

                           <View style={styles.right}>
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontWeight: 'bold', fontSize: 15}} >Ngày</Text>
                                 <Text style={{flex:1, textAlign: "right", fontSize: 15}}>aaaaaaaaaaaaaaa</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontWeight: 'bold', fontSize: 15}} >Giờ</Text>
                                 <Text style={{flex:1, textAlign: "right", fontSize: 15}}>{item.messageTime}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontWeight: 'bold', fontSize: 15}} >Tên KH</Text>
                                 <Text style={{flex:1, textAlign: "right", fontSize: 15}}>{item.userName}</Text>
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