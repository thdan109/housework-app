import React from 'react'
import { View, Text, Dimensions,StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert,Modal } from 'react-native'

import ModalWork from '../../components/staff/ModalWork'


const {width, height} = Dimensions.get('screen')

const  HomeStaff = ({navigation}) =>{
   const [modalVisible, setModalVisible] = React.useState(false);

   return(
      <View style={{flex:1, backgroundColor: '#D2691E'}}>
         
         <View style={styles.headerContainer}>
            <View style={styles.title} >
               <Text style={{
                  fontSize: 19, 
                  fontWeight: 'bold', 
                  color: 'white'
               }}>HÔM NAY</Text>
            </View>
            <View style={{
                     flexDirection: 'row', 
                     marginLeft: 30, 
                     marginTop: 10
            }}>
               <Text style={{color: 'white', fontWeight: 'bold'}}>Số công việc:</Text>
            </View>
         </View>

         <View style={{height: 650, alignItems: 'center'}} >
            <ScrollView style={styles.scrollview}>
               {/* Show work */}
               <TouchableOpacity onPress={() => {
                  setModalVisible(true);
               }}>
                  <View style={{marginVertical: 20, marginHorizontal: 10}}>
                     <View style={styles.showSchedule}>
                        <View style={{flexDirection: 'row'}}>
                           <Text style={{fontWeight: 'bold'}}>Tên việc: </Text>
                           <Text style={{flex:1, textAlign: 'right'}}>aaaa</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                           <Text style={{fontWeight: 'bold'}}>Thời gian: </Text>
                           <Text style={{flex:1, textAlign: 'right'}}>aaaa</Text>
                        </View>
                     </View>
                  </View>
                  
               </TouchableOpacity>
               
            </ScrollView>
         </View>
         
         <View style={styles.containerModal}>
            <ModalWork isModalVisible={modalVisible} setModalVisible={setModalVisible} />
         </View>
      </View>
   )
}
export default HomeStaff

const styles = StyleSheet.create({
   
   headerContainer:{ 
      // justifyContent: "center",
      height: 100
      // backgroundColor: 'white'
   },
   scrollview: {
      borderRadius: 27,
      height: 600,
      backgroundColor: 'white',
      width: '100%'
   },
   title:{
      marginTop: 30,
      alignItems: 'center'
   },
   showSchedule:{
      height: 60,
      // borderWidth: 1,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 100, 0,0.3)',
      paddingHorizontal: 10,
      paddingVertical: 10
   }, 
   containerModal:{
     
   }

})