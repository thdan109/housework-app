import React from 'react'
import { View, Text, Dimensions,StyleSheet, TextInput,AsyncStorage, ScrollView, TouchableOpacity, Alert,Modal, Button } from 'react-native'
import Moment from 'moment'
import ModalWork from '../../components/staff/ModalWork'
import { Entypo,FontAwesome,Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import {LinearGradient} from 'expo-linear-gradient'
import axios from 'axios';
import host from '../../host'


const {width, height} = Dimensions.get('screen')

const  WorkStaffScreen = ({navigation}) =>{
   const [work, setWork] = React.useState([])
   const [workWash, setWorkWash] = React.useState([])
   const staff = useSelector(state => state)
   const [modalVisible, setModalVisible] = React.useState({visible: false,id: null,department: null});
   const [id,setID] = React.useState(null);
   React.useEffect(()=>{
      // console.log(staff);
      getDataWork()
   },[])

   const getDataWork = async() =>{
      const id = staff.users.data._id
      const department = staff.users.data.department

      if (department === 'Bộ phận Vệ sinh nhà'){
         const nowdate = '2021-03-31T17:00:00.000Z'
         const work = await axios.post(`${host}/clear/workStaffAll`,{
            id: id,
            // nowDate: nowdate
         })
         if (work.data.work === 'Failed'){
            setWork(null)
         }else{
            setWork(work.data)
         }  
      }else if (department === 'Bộ phận Giặt ủi'){
         const nowdate = '2021-03-31T17:00:00.000Z'
         const work = await axios.post(`${host}/washing/workStaffAll`,{
            id: id,
            // nowDate: nowdate
         })
         if (work.data.work === 'Failed'){
            setWork(null)
         }else{
            setWork(work.data)
         }  
      }else if (department === 'Bộ phận Nấu ăn'){
         // const nowdate = '2021-03-31T17:00:00.000Z'
         const work = await axios.post(`${host}/cooking/workStaffAll`,{
            id: id,
            // nowDate: nowdate
         })
         if (work.data.work === 'Failed'){
            setWork(null)
         }else{
            setWork(work.data)
         }  
      }
   }

   return(
      
      <View style={{flex:1, backgroundColor: '#D2691E'}}>
         <LinearGradient style={{flex:1}} colors={["#FFEBCD","#FFEBCD"]}>
            <View style={styles.headerContainer}>
                  {/* <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="arrow-back-sharp" size={28} color="black" />
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
                     
               </View> */}
               <View style={{ flexDirection: 'row', height: 40, paddingTop: 5, paddingHorizontal: 10, backgroundColor: '#FFDEAD' }}>
                  <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="arrow-back-sharp" size={28} color="black" />
                  </TouchableOpacity>
                  <View style={{flex:1}}>
                     
                        <Text style={{fontSize: 19, fontWeight: 'bold', color: 'black', textAlign: 'center'}} > Việc  </Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                     setModalVisible(true);
                  }}>
                     <Ionicons name="qr-code-sharp" size={28} color="black" style={{paddingRight: 5, opacity: 0}} />
                  </TouchableOpacity>
                  
               </View>
               
            </View>

            <View style={{ alignItems: 'center'}} >
               <ScrollView style={styles.scrollview}>
                  {/* Show work */}
                  
               {
                  ((work.length === 0))? 
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                     <View style={{justifyContent:'center', marginVertical: 60}}>
                       
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Không có công việc nào hôm nay!</Text>
                     </View>
                  </View>
                     :
                  <View>
                  {work.map((dt) =>(
                     <TouchableOpacity key={Math.random()} onPress={async () => {
                        setModalVisible({visible: true,id: dt._id,department: staff.users.data.department});
                        // console.log({visible: true,id: dt._id});

                     }}>
                        <View key={Math.random()} style={{marginVertical: 20, marginHorizontal: 10}}>
                        
                              <View key={Math.random()} style={styles.showSchedule}>
                                 <View key={Math.random()} 
                                    style={{flexDirection:'column', 
                                          width: '25%', 
                                          borderWidth: 0, 
                                          borderBottomLeftRadius: 27,  
                                          backgroundColor: '#008B8B',
                                          paddingVertical: 10, 
                                          paddingHorizontal: 5, 
                                          justifyContent:'center', 
                                          alignItems: 'center'
                                    }}>
                                    {/* <Text style={{fontWeight: 'bold'}}>Thời gian: </Text> */}
                                    <Text style={{flex:1, fontWeight: 'bold', textAlign: 'center', fontSize: 27, color: 'white'}}>{dt.timeStart}</Text>
                                 </View>
                                 <View style={{flex:1, borderColor: '#008B8B', borderWidth:1,paddingVertical: 10, paddingHorizontal: 5, borderTopRightRadius: 27}}>
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
                  </View>
              }
               </ScrollView>
               
            </View>
            <View style={{marginTop: 15, }}>
               {/* <TouchableOpacity onPress={()=>getDataWork()}>
                  <View style={{ height: 50,justifyContent: 'center', alignItems: 'center', backgroundColor: '#008B8B', borderRadius: 15, marginHorizontal: 10  }}>
                     <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>Làm mới</Text>
                  </View>
               </TouchableOpacity> */}
                <View style={styles.containerButton}>
                  <Button
                     height={20}
                     onPress={()=>getDataWork()}
                     title="Làm mới"
                     color="#006400"
                     // accessibilityLabel="Learn more about this purple button"
                  />
               </View>
            </View>
            <View style={styles.containerModal}>
                <ModalWork isModalVisible={modalVisible.visible} idWork={modalVisible.id} setModalVisible={setModalVisible} idStaff={staff.users.data._id} department={modalVisible.department} />
            </View>
         </LinearGradient>
         {/* <Text onPress={()=>console.log(work)}></Text> */}
      </View>
   )
}
export default WorkStaffScreen

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