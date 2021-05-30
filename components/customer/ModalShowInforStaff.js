import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import host from '../../host';
import axios from 'axios'
import Moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import  { addWorkClear, addWorkCooking, addWorkWashing } from '../../action/workAction'

const ModalShowInforStaff = (props) => {
   const [modalVisible, setModalVisible] = useState(false);
   const dispatch = useDispatch()
   const [data, setData] = useState()
   React.useEffect(()=>{
      // console.log(props.idStaff);
      getDataStaff()
   },[props.idStaff])

   const ChangeStatus = async() =>{
      console.log('Den roi! Xac nhan Thoi');
      const listStaff = props.staff
      const idStaff = props.idStaff
      const idUpdate = props.idWork
      const typeWork = props.typeWork
      
      const result = listStaff.filter(staff =>{return staff === idStaff})
      // console.log(result.length);

      const getOrder = async() =>{
         // console.log('aaa');
         const token_val = await AsyncStorage.getItem('Token')
         // console.log(token_val);
         
         const dataOrder = await axios.get(`${host}/user/getOrder`,{
            headers: {
               Authorization: `Bearer ${token_val}`,
            }
         })
         if (dataOrder.data.orderClear){      
            dispatch(addWorkClear(dataOrder.data.orderClear))
         }
         if (dataOrder.data.orderCooking){
            dispatch(addWorkCooking(dataOrder.data.orderCooking))
      
         }
         if (dataOrder.data.orderWashing){
            dispatch(addWorkWashing(dataOrder.data.orderWashing))
         }
         // console.log(dataWashing);
      }

      if ( result.length === 1 ){
         if (typeWork === "cooking"){
            await axios.post(`${host}/cooking/updateStatusWorking`,{
               id : idUpdate
            })
            await getOrder()
            Alert.alert("Bạn đã xác nhận nhân viên của chúng tôi!")
         }else if (typeWork === "washing"){
            console.log("giat ui");
            await axios.post(`${host}/washing/updateStatusWorking`,{
               id : idUpdate
            })
            // .then(data =>{
            //    console.log('aaaaaaaa');
            // }).then(data =>{
            //    // console.log(data.data);
            //    getOrder()
            // }).catch(err =>{
            //    console.log(err);
            // })
            await getOrder()
            Alert.alert("Bạn đã xác nhận nhân viên của chúng tôi!")
         }else if ( typeWork === "clear"){
            // console.log("Don nha")
            await axios.post(`${host}/clear/updateStatusWorking`,{
               id : idUpdate
            })
            // .then(data =>{
            //    // console.log(data.data);
            //    getOrder()
            // }).catch(err =>{
            //    console.log(err);
            // }).then(data =>{
            //    // console.log(data.data);
            //    getOrder()
            // }).catch(err =>{
            //    console.log(err);
            // })
            // console.log("Don nha")
            await getOrder()
            Alert.alert("Bạn đã xác nhận nhân viên của chúng tôi!")
         }
         setData(null)
      }else if ( result.length === 0 ){
         return Alert.alert('Nhân viên không đúng bộ phận!')
      }

      
   }

   const getDataStaff = async()=>{
      const id = props.idStaff
      const staff = await axios.post(`${host}/staff/getStaffById`,{
         id: id
      })
      if (staff.data.error){
         setData(null)
      }else{
         setData(staff.data)
      }
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
               !data?
                  <View style={{height: 300,  width: '96%', backgroundColor: 'white',borderRadius: 40,padding: 10}}>
                     <Text style={{ textAlign: 'center', height: 30, fontSize: 20, fontWeight: 'bold', color: 'black', marginBottom: 20}}>Nhân viên không tồn tại</Text>
                     <View style={{ justifyContent: 'center',alignItems: 'center',padding: 10,height: 590,marginBottom:20,backgroundColor: 'rgba(100,100,100,0.1)', height: 150}}>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Đây không phải nhân viên của chúng tôi!!!</Text>
                     </View>
                  <View style={{flexDirection: 'row'}}>
                     <TouchableOpacity
                        style={{
                           marginHorizontal: 10,
                           width: '45%', borderWidth:0, 
                           height: 45, borderRadius: 20, 
                           justifyContent: 'center', alignItems: "center", 
                           backgroundColor:'red' 
                        }}
                        onPress={async() => {
                                       // Alert.alert('Nhân viên đã đến!')
                                       setData(null)
                                       props.setModalVisible(!props.isModalVisible)
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
                           setData(null)
                           props.setModalVisible(!props.isModalVisible)}}
                     >
                        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16}}>Đóng</Text>
                     </TouchableOpacity>
                  </View>
                  
               </View>
               :
            <View style={styles.Infor}>
                  <Text style={{ textAlign: 'center', height: 30, fontSize: 20, fontWeight: 'bold', color: 'black', marginBottom: 20}}>Thông tin nhân viên</Text>
                  <View style={styles.InforStaff}>
                     <View style={styles.avatar}>
                        <View style={{backgroundColor: 'white', height: 118, width: 118, borderRadius: 65, borderColor: 'white', borderWidth: 3   }}>
                           <Image source={{uri: `${host}/${data.avatarStaff}` }} style={{ flex: 1,  borderRadius: 80}} />
                        </View>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>ID nhân viên</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{data._id}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Tên nhân viên</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{data.fullnameStaff}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Bộ phận làm việc</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{data.department}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Giới tính</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{data.sex}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Số điện thoại</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{data.numberPhone}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginBottom: 20, paddingBottom: 3, borderBottomWidth: 0.2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Ngày gia nhập</Text>
                        <Text style={{flex:1, textAlign:'right', fontSize: 16, fontWeight: 'bold'}}>{Moment(data.joinDay).format('dddd  DD/MM/YYYY')}</Text>
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
                        setData(null)
                        // Alert.alert('Nhân viên đã đến!')
                        props.setModalVisible(!props.isModalVisible)
                        ChangeStatus()
                       
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
                        setData(null)
                        props.setModalVisible(!props.isModalVisible)}}
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
export default ModalShowInforStaff;
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
      height: 740,
      width: '96%',
      backgroundColor: 'white',
      borderRadius: 40,
      padding: 10
   },
   InforStaff: {
      padding: 10,
      height: 590,
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

