import React from 'react'
import {View, Text, Modal, TouchableOpacity, Pressable, StyleSheet, TouchableHighlight, Image} from 'react-native'
import { useSelector } from 'react-redux'
import host from '../../host'

const ModalShowQR = (props) =>{
   const staff = useSelector(state=>state)
   const [modalVisible, setModalVisible] = React.useState(false);
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
                  {/* <Text onPress={()=>console.log(staff.users.data.qrStaff, staff.users.data.avatarStaff)}>aaaaaaaaaaa</Text> */}
                  {/* Noi dung */}
                  <View style={styles.Content}>
                     <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}} >QR nhân viên</Text>
                     <View style={{height: 200, width: 200, borderWidth: 0, marginTop: 30}}>
                        <Image source={{uri: `${host}/${staff.users.data.qrStaff}`}} style={{flex:1}} />
                     </View>
                  </View>
                  
                  <View style={styles.close}>
                     {/* <TouchableHighlight
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
                        <Text style={{fontWeight: 'bold', color:'white'}}>Hoàn tất</Text>
                     </TouchableHighlight> */}
                     
                     <TouchableHighlight
                        style={{
                           marginHorizontal: 10,
                           width: '63%', borderWidth:0, 
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
export default ModalShowQR
const styles = StyleSheet.create({
   Container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth:1
      // backgroundColor: 'white'
      backgroundColor: 'rgba(200,200,200,0.8)'
   }, 
   ContainerContent:{
      borderWidth: 1,
      height: 360,
      width: '81%',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 10
   }, 
   Content:{
      // justifyContent:'center',
      alignItems: 'center',
      height: 280
   },
   close:{
      flexDirection: 'row',
      justifyContent:'center'
   }

})