import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import host from '../../host';
import axios from 'axios'
import Moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import  { addWorkClear, addWorkCooking, addWorkWashing } from '../../action/workAction'

const ModalReportStaff = (props) => {
   const [modalVisible, setModalVisible] = useState({visible: false, idStaff: null,idWork: null});
   const dispatch = useDispatch()
   // const [data, setData] = useState()
   React.useEffect(()=>{
      // getDataStaff()
   },[props.idStaff])

   const [ report, setReport ] = React.useState()

      // const getDataStaff = async()=>{
   //    const id = props.idStaff
   //    const staff = await axios.post(`${host}/staff/getStaffById`,{
   //       id: id
   //    })
   //    if (staff.data.error){
   //       setData(null)
   //    }else{
   //       setData(staff.data)
   //    }
   // }
   const submitReport = async() =>{
      await axios.post(`${host}/reportstaff/add`,{
         idStaff: props.idStaff,
         idWork: props.idWork,
         report: report 
      }).then(result =>{
         if (result.status === 200){
            return Alert.alert("Cảm ơn bạn đã báo cáo với chúng tôi!")
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
        visible={props.isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
         <View style={styles.ContainerInfor} >
            {
            <View style={styles.Infor}>
                  <Text style={{ textAlign: 'center', height: 30, fontSize: 20, fontWeight: 'bold', color: 'black', marginBottom: 20}}>Báo cáo nhân viên</Text>
                  <View style={styles.InforStaff}>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>ID nhân viên</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{props.idStaff}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>ID work</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{props.idWork}</Text>
                     </View>
                     <View style={{flex:1 ,marginBottom: 20, paddingBottom: 3}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Báo cáo vi phạm</Text>
                        <TextInput
                           onChangeText = {(val) => setReport(val) }
                           multiline={true}
                           numberOfLines={10}
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
                        submitReport()
                        props.handChangemodalVisible()
                     }}
                  >
                     <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16}}>Xác nhận</Text>
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
                        props.handChangemodalVisible()
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
export default ModalReportStaff;
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
      height: 640,
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

