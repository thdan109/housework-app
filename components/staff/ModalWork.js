import React from 'react'
import {View, Text, Modal, TouchableOpacity, Pressable, StyleSheet, TouchableHighlight, ScrollView} from 'react-native'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import host from '../../host'
import Moment from 'moment'
import {List } from 'react-native-paper'

const ModalWork = (props) =>{

   const [modalVisible, setModalVisible] = React.useState({visible: false,id: null});
   const [work, setWork] = React.useState()

   React.useEffect(()=>{
      getDataWorkById()
   },[props.idWork])

   const getDataWorkById = async() =>{
      const department = props.department
      const idStaff = props.idStaff
      const idWork = props.idWork
      if (department === "Bộ phận Vệ sinh nhà"){
         const work = await axios.post(`${host}/clear/workStaffById`,{
            idWork: idWork,
            idStaff: idStaff
         })
         if (work.status === 200){
            setWork(work.data)
         }else{
            setWork(null)
         }
      }else if (department === "Bộ phận Giặt ủi"){
         const work = await axios.post(`${host}/washing/workStaffById`,{
            idWork: idWork,
            idStaff: idStaff
         })
         if (work.status === 200){
            setWork(work.data)
         }else{
            setWork(null)
         }
      }else if (department === "Bộ phận Nấu ăn"){
         const work = await axios.post(`${host}/cooking/workStaffById`,{
            idWork: idWork,
            idStaff: idStaff
         })
         if (work.status === 200){
            setWork(work.data)
         }else{
            setWork(null)
         }
      }  
   }

   const SaveOrder = async() =>{
      // const id = idWork
      // console.log(work);
      const department = props.department
      if (department === "Bộ phận Vệ sinh nhà"){
         const process = await axios.post(`${host}/clearsave/create`,{
            work: work
         })
         if (process.status === 200){
            getDataWorkById()
         }else{
            // setWork(null)
         }
      }else if (department === "Bộ phận Giặt ủi"){
         const process = await axios.post(`${host}/washingsave/create`,{
            work: work
         })
         if (process.status === 200){
            getDataWorkById()
         }else{
            // setWork(null)
         }
      }else if (department === "Bộ phận Nấu ăn"){
         const process = await axios.post(`${host}/cookingsave/create`,{
            work: work
         })
         if (process.status === 200){
            getDataWorkById()
         }else{
            // setWork(null)
         }
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
                     <Text style={{fontWeight: 'bold', fontSize: 19, textAlign: 'center', marginBottom: 30}} >Chi tiết công việc</Text>
               {
                  (!work?<Text>wait</Text>:
                    <View>
                        {
                           (props.department === "Bộ phận Giặt ủi")?
                           <View>
                              {/* <Text>Giặt ủi</Text> */}
                              <ScrollView style={{height: 300}}
                                 showsHorizontalScrollIndicator={false}
                                 showsVerticalScrollIndicator={false}   
                              >
                                 <View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tên Khách hàng</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.fullname}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Ngày nhận</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{Moment(work.dateSend).format('dddd  DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Giờ nhận</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.timeSend}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Ngày trả</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{Moment(work.dateTake).format('dddd  DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Giờ trả</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.timeTake}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Ghi chú</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.note}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Trạng thái</Text>
                                       <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold', color:'red'}}>{work.status}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                       <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tổng tiền</Text>
                                       {/* <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.money}</Text> */}
                                       <NumberFormat style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}  value={work.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                    </View>

                                 </View>  
                              </ScrollView>
                           </View>
                           :
                           (props.department === "Bộ phận Nấu ăn")?
                           <ScrollView style={{height: 300}} 
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}   >
                              <View >
                                 <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tên Khách hàng</Text>
                                    <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.fullname}</Text>
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
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Số món</Text>
                                    <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.number}</Text>
                                 </View>
                                 <View key={Math.random()} style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text  key={Math.random()} style={{flex:1,fontSize: 14, fontWeight: 'bold'}}>Món</Text>
                                 {
                                    work.dishList.map(dt =>(
                                          <Text key={Math.random()} style={{flex: 1, textAlign: 'right',paddingRight: 8, fontSize: 14, fontWeight: 'bold', borderRightWidth: 1}}>{dt}</Text>
                                    ))
                                 }
                                 </View>
                                 <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Đi chợ</Text>
                                    <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.goMarket}</Text>
                                 </View>
                                 <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Trái cây</Text>
                                    <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.fruit}</Text>
                                 </View>
                                 <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Giờ bắt đầu làm</Text>
                                    <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.timeStart}</Text>
                                 </View>
                                 <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Trạng thái</Text>
                                    <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold', color: 'red'}}>{work.status}</Text>
                                 </View>
                                 <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tổng tiền</Text>
                                    {/* <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.money}</Text> */}
                                    <NumberFormat style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}  value={work.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                 </View>
                              
                              </View>
                           </ScrollView>:
                           (props.department === 'Bộ phận Vệ sinh nhà')?
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
                                 <Text style={{fontSize: 14, fontWeight: 'bold'}}>Trạng thái</Text>
                                 <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold', color: 'red'}}>{work.status}</Text>
                              </View>
                              <View style={{flexDirection: 'row', paddingBottom: 3, borderBottomWidth: 1, marginBottom: 10, borderBottomColor: '#008B8B'}}>
                                 <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tổng tiền</Text>
                                 {/* <Text style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}>{work.money}</Text> */}
                                 <NumberFormat style={{flex: 1, textAlign: 'right', fontSize: 14, fontWeight: 'bold'}}  value={work.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                              </View>

                              {/* <Text onPress={()=>getDataWorkById()} >aaaaaa</Text> */}
                           </View>
                           :
                           <View>

                           </View>
                     }
                     <View style={styles.close}>
                     
                     {
                        ((work.status === "Chờ thu tiền"))?
                        <TouchableHighlight
                           style={{
                              marginHorizontal: 10,
                              width: '45%', borderWidth:0, 
                              height: 40, borderRadius: 20, 
                              justifyContent: 'center', alignItems: "center", 
                              backgroundColor:'green' 
                           }}
                           onPress={() => {
                              // console.log(work._id)
                              SaveOrder()
                              props.setModalVisible(!props.isModalVisible);
                           }}
                        >
                           <Text style={{fontWeight: 'bold', color:'white'}}>Đã thu</Text>
                        </TouchableHighlight>
                        :
                        <View style={{
                           marginHorizontal: 10,
                           width: '45%', borderWidth:0, 
                           height: 40, borderRadius: 20, 
                           justifyContent: 'center', alignItems: "center", 
                           backgroundColor:'green' ,
                           opacity: 0
                        }}></View>
                     }
                     
                     
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

                  )
               }
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
      flexDirection: 'row',
      marginTop: 20,
      // borderWidth: 1
   }

})