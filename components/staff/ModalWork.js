import React from 'react'
import {View, Text, Modal, TouchableOpacity, Pressable, StyleSheet, TouchableHighlight} from 'react-native'

const ModalWork = (props) =>{

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
                  {/* Noi dung */}
                  <View style={styles.Content}>
                     <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}} >Chi tiết công việc</Text>



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
                        <Text style={{fontWeight: 'bold', color:'white'}}>Hoàn tất</Text>
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
      // borderWidth:1
      // backgroundColor: 'white'
   }, 
   ContainerContent:{
      borderWidth: 1,
      height: 450,
      width: '81%',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 10
   }, 
   Content:{
      height: 380
   },
   close:{
      flexDirection: 'row'
   }

})