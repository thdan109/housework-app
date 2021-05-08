import axios from 'axios'
import React from 'react'
import {View, Text, Modal, TouchableOpacity, Pressable, StyleSheet, TouchableHighlight, Image, ScrollView} from 'react-native'
import { useSelector } from 'react-redux'
import host from '../../host'
import Moment from 'moment'
import {List } from 'react-native-paper'

const ModalShowDayLeave = (props) =>{
   const staff = useSelector(state=>state)
   const [modalVisible, setModalVisible] = React.useState(false);
   const [ data, setData ] = React.useState()
   
   React.useEffect(()=>{
      getDataById()
   },[])

   const getDataById =  async() =>{
      const id = props.idStaff
      // console.log(id);
      const dataLeave = await axios.post(`${host}/leave/dataLeaveById`,{
         id: id
      })
      if (dataLeave.data){
         setData(dataLeave.data)
      }else{
         setData(null)
      }
   }

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
                     <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}} >Lịch sử nghỉ</Text>
                     <View style={{borderWidth: 0, marginTop: 30}}>
                        {/* <Image source={{uri: `${host}/${staff.users.data.qrStaff}`}} style={{flex:1}} /> */}
                        {/* <Text onPress={()=>console.log(data)}>aaaaaaaaaa</Text> */}
                        <ScrollView >
                        {
                           (data)?
                           <View >
                              {
                                 data.map(dt =>
                                    <List.Accordion
                                       key={Math.random()}
                                       title={Moment(dt.date).format('dddd  DD/MM/YYYY')}
                                       left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                                       style={{backgroundColor: '#BDB76B', marginBottom: 20}}
                                    >
                                    <View key={Math.random()} style={{marginBottom: 20, backgroundColor:"#D2B48C", paddingVertical: 10, paddingHorizontal: 5, marginLeft: 20 }}   >
                                       <View key={Math.random()} style={{flexDirection:'row', paddingBottom: 3}}>
                                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Lý do</Text>
                                          <Text style={{flex: 1, textAlign: 'right', fontSize: 16}} >{dt.reason}</Text>
                                       </View>
                                       <View key={Math.random()} style={{flexDirection:'row', paddingBottom: 3}}>
                                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Trạng thái</Text>
                                          <Text style={{flex: 1, textAlign: 'right', fontSize: 16}} >{dt.status}</Text>
                                       </View>
                                    </View>
                                    </List.Accordion>
                                 )
                              }
                           </View>
                           :
                           <View>
                              <Text>Tháng này bạn chưa nghỉ</Text>
                           </View>
                        }

                     </ScrollView>
                     </View>

                     

                  </View>
                  
                  <View style={styles.close}>
                     <TouchableHighlight
                        style={{
                           marginHorizontal: 10,
                           width: '99%', borderWidth:0, 
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
export default ModalShowDayLeave
const styles = StyleSheet.create({
   Container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(200,200,200,0.8)'
   }, 
   ContainerContent:{
      borderWidth: 1,
      height: 660,
      width: '99%',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 10
   }, 
   Content:{
      height: 580
   },
   close:{
      flexDirection: 'row',
      justifyContent:'center'
   }

})