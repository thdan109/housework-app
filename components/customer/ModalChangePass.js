import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import host from '../../host';
import axios from 'axios'
import Moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import  { addWorkClear, addWorkCooking, addWorkWashing } from '../../action/workAction'
import UserFeedback from 'react-native-user-feedback';
import { Star } from "react-native-user-feedback"



const ModalChangePassword = (props) => {
   const [modalVisibleFB, setModalVisibleFB] = useState({visible: false, idWork: null});
   const dispatch = useDispatch()
   // const [data, setData] = useState()
   React.useEffect(()=>{
      // getDataStaff()
   },[props.idStaff])

   const [ feedback, setFeedback ] = React.useState()
   const [ numberRating, setNumberRating] = React.useState()

      const submitFeedback = async() =>{
         
         await axios.post(`${host}/feedback/addFeedBack`,{
            idWork: props.idWork,
            idUser: props.idUser,
            nameUser: props.nameUser,
            feedback: feedback ,
            number: numberRating
         }).then(result =>{
            if (result.data.status === 'Oke'){
               return Alert.alert("Cảm ơn bạn. Chúng tôi sẽ dựa trên đánh giá của bạn để phát triển tốt hơn!")
            }
         }).catch(err =>{
            console.log(err);
         })
      }


  return (
    <View style={styles.Container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisibleFB}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleFB(!modalVisibleFB);
        }}
      >
         <View style={styles.ContainerInfor} >
            {
            <View style={styles.Infor}>
                  <Text style={{ textAlign: 'center', height: 30, fontSize: 20, fontWeight: 'bold', color: 'black', marginBottom: 20}}>Đánh giá dịch vụ</Text>
                  <View style={styles.InforStaff}>
                     {/* <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Bạn sẽ đánh gái chúng tôi</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>aaaaaaaaaaaaaaa</Text>
                     </View> */}
                     <View style={{marginBottom: 20, paddingBottom: 3,textAlign: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>Bao nhiêu sao nhỉ</Text>
                        <UserFeedback
                           maxNumber={5}
                           rating={numberRating}
                           onRatingChanged={setNumberRating}
                           renderRating={Star}
                        />
                     </View>
                     <View style={{flex:1 ,marginBottom: 20, paddingBottom: 3}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Đánh giá của bạn</Text>
                        <TextInput
                           onChangeText = {(val) => setFeedback(val) }
                           multiline={true}
                           numberOfLines={9}
                           //    style={{ height:145, textAlignVertical: 'top', borderWidth: 1, borderColor: '#228B22', borderRadius: 10, padding: 10}}
                           style={{flex:1, textAlignVertical: 'top', fontSize: 16,textAlign: 'right', borderWidth: 0.2, marginVertical: 5}}
                        ></TextInput>
                     </View>
                     
                  </View>
               
               <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                     style={{
                        marginHorizontal: 10,
                        width: '45%', borderWidth:0, 
                        height: 45, borderRadius: 20, 
                        justifyContent: 'center', alignItems: "center", 
                        backgroundColor:'green' 
                     }}
                     onPress={async() => {
                        submitFeedback()
                        props.handChangemodalVisibleFB()
                     }}
                  >
                     <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16}}>Gửi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{
                        marginHorizontal: 10,
                        width: '45%', borderWidth:0, 
                        height: 45, borderRadius: 20, 
                        justifyContent: 'center', alignItems: "center", 
                        backgroundColor:'gray' 
                     }}
                     onPress={() => {
                        props.handChangemodalVisibleFB()
                     }
                     }  
                  >
                     <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16}}>Đóng</Text>
                  </TouchableOpacity>
               </View>
               
            </View>
         }
         </View>
      </Modal>
    </View>
  );
};
export default ModalChangePassword;
const styles = StyleSheet.create({
   Container: {
      // backgroundColor: 'black'
   },  
   ContainerInfor: {
      flex: 1,
      backgroundColor: 'rgba(120,120,120,1)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   Infor:{
      height: 612,
      width: '96%',
      backgroundColor: 'white',
      borderRadius: 40,
      padding: 10
   },
   InforStaff: {
      padding: 10,
      height: 450,
      // borderTopWidth: 0.5,
      // borderBottomWidth: 0.5,
      marginBottom:20,
      backgroundColor: 'rgba(100,100,100,0.1)'
   },
   avatar: {
      marginBottom:10,
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

