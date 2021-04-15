import React from 'react'
import { View, Text, Dimensions,StyleSheet, TextInput,AsyncStorage, ScrollView, TouchableOpacity, Alert,Modal } from 'react-native'
import Moment from 'moment'
import ModalWork from '../../components/staff/ModalWork'
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import {LinearGradient} from 'expo-linear-gradient'
import axios from 'axios';
import host from '../../host'


const {width, height} = Dimensions.get('screen')

const  HomeStaff = ({navigation}) =>{
   const [work, setWork] = React.useState([])
   const staff = useSelector(state => state)
   const [modalVisible, setModalVisible] = React.useState({visible: false,id: null});
   const [id,setID] = React.useState(null);
   React.useEffect(()=>{
      // console.log(staff);
      getDataWork()
   },[])

   const getDataWork = async() =>{
      const id = staff.users.data._id
      // const nowdate= new Dat  e()
      const nowdate = '2021-03-31T17:00:00.000Z'
      const work = await axios.post(`${host}/clear/workStaff`,{
         id: id,
         nowDate: nowdate
      })
      // console.log(work.data)
      setWork(work.data)
   }

   return(
      
      <View style={{flex:1, backgroundColor: '#D2691E'}}>
         <LinearGradient style={{flex:1}} colors={["#FFEBCD","#FFEBCD"]}>
            <View style={styles.headerContainer}>
               <TouchableOpacity onPress={() => navigation.openDrawer()} style={{paddingHorizontal: 5}}>
                  <Entypo name="menu" size={36} color="black"/>
               </TouchableOpacity>
               <View style={styles.title} >
                  <Text 
                  style={{
                     fontSize: 19, 
                     fontWeight: 'bold', 
                     color: 'black'
                  }}>HÔM NAY</Text>
               </View>
               <View style={{
                        flexDirection: 'row', 
                        marginLeft: 30, 
                        marginTop: 10
               }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>Số công việc:</Text>
               </View>
            </View>

            <View style={{ alignItems: 'center'}} >
               <ScrollView style={styles.scrollview}>
                  {/* Show work */}
               {work.map((dt) =>(
                  <TouchableOpacity key={Math.random()} onPress={async () => {
                     setModalVisible({visible: true,id: dt._id});
                     // console.log({visible: true,id: dt._id});

                  }}>
                     <View key={Math.random()} style={{marginVertical: 20, marginHorizontal: 10}}>
                       
                           <View key={Math.random()} style={styles.showSchedule}>
                              <View key={Math.random()} 
                                 style={{flexDirection:'column', 
                                       width: '25%', 
                                       borderWidth: 0, 
                                       borderBottomLeftRadius: 27,  
                                       backgroundColor: '#AFEEEE',
                                       paddingVertical: 10, 
                                       paddingHorizontal: 5, 
                                       justifyContent:'center', 
                                       alignItems: 'center'
                                 }}>
                                 {/* <Text style={{fontWeight: 'bold'}}>Thời gian: </Text> */}
                                 <Text style={{flex:1, fontWeight: 'bold', textAlign: 'center', fontSize: 27}}>{dt.timeStart}</Text>
                              </View>
                              <View style={{flex:1, borderColor: '#AFEEEE', borderWidth:1,paddingVertical: 10, paddingHorizontal: 5, borderTopRightRadius: 27}}>
                                 <View key={Math.random()} style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold'}}>Ngày làm: </Text>
                                    <Text style={{flex:1, textAlign: 'right'}}>{Moment(dt.date).format('dddd  DD/MM/YYYY')}</Text>
                                 </View>
                                 <View key={Math.random()} style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold'}}>Địa chỉ </Text>
                                    <Text style={{flex:1, textAlign: 'right'}}>{dt.address}</Text>
                                 </View>
                              </View>
                             
                              
                           </View>
                     </View>
                  </TouchableOpacity>
               ))}
              
               </ScrollView>
               
            </View>
            
            <View style={styles.containerModal}>
                <ModalWork isModalVisible={modalVisible.visible} idWork={modalVisible.id} setModalVisible={setModalVisible} idStaff={staff.users.data._id} />
            </View>
         </LinearGradient>
         {/* <Text onPress={()=>console.log(work)}></Text> */}
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
      borderRadius: 20,
      height: 600,
      backgroundColor: 'rgba(255,255,255,0.9)',
      width: '100%',
      // marginBottom: 20
   },
   title:{
      marginTop: 0,
      alignItems: 'center'
   },
   showSchedule:{
      flexDirection: 'row',
      height: 120,
      // marginBottom: 20,
      // borderWidth: 1,
      borderRadius: 10,
      // backgroundColor: 'rgba(0, 100, 0,0.3)',
      // paddingHorizontal: 10,
      // paddingVertical: 10
   }, 
   containerModal:{
     
   }

})