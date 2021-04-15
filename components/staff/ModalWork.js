import React from 'react'
import {View, Text, Modal, TouchableOpacity, Pressable, StyleSheet, TouchableHighlight} from 'react-native'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import host from '../../host'
import Moment from 'moment'

const ModalWork = (props) =>{

   const [modalVisible, setModalVisible] = React.useState({visible: false,id: null});
   const [work, setWork] = React.useState()

   React.useEffect(()=>{
      getDataWorkById()
   },[props.idWork])

   const getDataWorkById = async() =>{
      const idStaff = props.idStaff
      const idWork = props.idWork
      const work = await axios.post(`${host}/clear/workStaffById`,{
         idWork: idWork,
         idStaff: idStaff
      })
      if (work.status === 200){
         setWork(work.data)
      }else{
         setWork(null)
      }
   }

   if(!props.idWork) return <></>
   
   return(
      <View>
         <Modal 
            animationType="slide"
            transparent={true}
            visible={props.isModalVisible}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
               setModalVisible(!modalVisible);
            }}
         >
            <View style={styles.Container} >
               <View style={styles.ContainerContent}>
                  {/* Noi dung */}
                  <View style={styles.Content}>
                     <Text style={{fontWeight: 'bold', fontSize: 19, textAlign: 'center', marginBottom: 60}} >Chi tiết công việc</Text>
               {
                  (!work?<Text>wait</Text>:
                     <View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tên Khách hàng</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.username}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Ngày làm việc</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{Moment(work.date).format('dddd  DD/MM/YYYY')}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Địa chỉ</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.address}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Diện tích</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{Number(work.area)*100} m2</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Số phòng</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.numRoom} phòng</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Giờ bắt đầu làm</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.timeStart}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Thời gian làm việc</Text>
                           <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.timeWork} giờ</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tổng tiền</Text>
                           {/* <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.money}</Text> */}
                           <NumberFormat style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}  value={work.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                        </View>

                        {/* <Text onPress={()=>getDataWorkById()} >aaaaaa</Text> */}
                     </View>
                  )
               }
                  </View>
                  
                  <View style={styles.close}>
                     <TouchableHighlight
                        style={{
                           marginHorizontal: 10,
                           width: '45%', borderWidth:0, 
                           height: 40, borderRadius: 20, 
                           justifyContent: 'center', alignItems: "center", 
                           backgroundColor:'green' 
                        }}
                        onPress={() => {
                           props.setModalVisible(!props.isModalVisible);
                        }}
                     >
                        <Text style={{fontWeight: 'bold', color:'white'}}>Đã thu</Text>
                     </TouchableHighlight>
                     <TouchableHighlight
                        style={{
                           marginHorizontal: 10,
                           width: '45%', borderWidth:0, 
                           height: 40, borderRadius: 20, 
                           justifyContent: 'center', alignItems: "center", 
                           backgroundColor:'gray' 
                        }}
                        onPress={() => {
                           props.setModalVisible(!props.isModalVisible);
                        }}
                     >
                        <Text style={{fontWeight: 'bold', color:'white'}}>Đóng</Text>
                     </TouchableHighlight>
                  </View>
                  
               </View>
            </View>

         </Modal>
         
      </View>
   )
}
export default ModalWork
const styles = StyleSheet.create({
   Container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(200,200,200,0.8)'
   }, 
   ContainerContent:{
      // borderWidth: 1,
      height: 450,
      width: '91%',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 10
   }, 
   Content:{
      height: '91%'
   },
   close:{
      flexDirection: 'row'
   }

})