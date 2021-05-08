import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, Dimensions, StyleSheet,ScrollView, Image, TextInput,Alert} from 'react-native' 
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ModalShowDayLeave from '../../components/staff/ModalShowDayLeave'
import host from '../../host'
import { ModalDatePicker } from "react-native-material-date-picker";
import Moment from 'moment'
import axios from 'axios'

const {width, height} = Dimensions.get('screen')

const FormForLeave = ({navigation,props}) =>{

   React.useEffect(()=>{
      getLeave()
   },[])

   const staff = useSelector(state=>state) 
   const [modalVisible, setModalVisible] = React.useState(false);
   const [ datee, setdate] = React.useState(new Date(Date.now()+1*24*60*60*1000))
   const [ reason, setReason] = React.useState()
   const [ leave, setLeave ] = React.useState([])

   const changeDate = async(date) =>{
      const dateChoosed = date
      // const nowdate = new Date(Date.now()+1*24*60*60*1000)
      const nowdate = new Date()
      if ((dateChoosed.getTime() > nowdate.getTime())){
         setdate(dateChoosed)
      }else{
         setdate(null)
         return Alert.alert('Chọn ngày sau ngày hiện tại!')
      }
   }
   const handleChangeText = async(val) =>{
      setReason(val)
   }

   const getLeave = async() =>{
      const id = staff.users.data._id
      const dataLeave = await axios.post(`${host}/leave/leaveOfStaffById`,{
         id: id
      })
      setLeave(dataLeave.data)
      // console.log(dataLeave.data);

   }

   const onSubmitForm  = async() =>{
      const id = staff.users.data._id
      const name = staff.users.data.fullnameStaff
      const department = staff.users.data.department
      console.log('aaaaa',reason);
      if ( reason && (datee!==null)  ){
         const form =  await  axios.post(`${host}/leave/create`,{
            id : id,
            name:  name,
            department : department,
            date : datee,
            reason : reason
         })
         if (form.data.status === 'Successfully!'){
            navigation.navigate('NavigatorStaff')
            getLeave()
         }else{
            Alert.alert('Chưa gửi được!')
         }
      }else{
         return Alert.alert('Vui lòng điền lý do')
      }
     
      
   }

   return(
      <View style={styles.container} >
         <LinearGradient style={{flex:1}} colors={["#FFEBCD","#FFEBCD"]} >
            <View style={styles.profile}  > 
               
               <View style={{ flexDirection: 'row', height: 40, paddingTop: 5, paddingHorizontal: 10, backgroundColor: '#FFDEAD' }}>
                  <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="arrow-back-sharp" size={28} color="black" />
                  </TouchableOpacity>
                  <View style={{flex:1}}>
                        <Text style={{fontSize: 19, fontWeight: 'bold', color: 'black', textAlign: 'center'}} > Xin nghỉ phép </Text>
                  </View>
                  <View style={{opacity: 0}}>
                     <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                     }}>
                        <Ionicons name="qr-code-sharp" size={28} color="black" style={{paddingRight: 5}} />
                     </TouchableOpacity>
                  </View>
                  
                  
               </View>

               {/* <View style={styles.avatar}>
                     <View style={{backgroundColor: 'white', height: 118, width: 118, borderRadius: 65, borderColor: 'white', borderWidth: 3   }}>
                        <Image source={{uri: `${host}/${staff.users.data.avatarStaff}` }} style={{ flex: 1,  borderRadius: 80}} />
                     </View>
               </View> */}

               {/* <ScrollView style={styles.scrollview} > */}
                  <View>
                     <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 30}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}} >Ngày đã nghỉ/tháng: </Text>
                        { 
                           // (leave && leave.length < 2)?
                           // (
                           //    <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>1</Text>
                           // )
                           // :
                           (leave && leave.length)?
                           (
                              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>{leave.length}</Text>
                           )
                           :
                           (
                              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>0</Text>
                           )
                        }
                     </View>
                     { 
                           // (leave && leave.length < 2)?
                           // (
                           //    <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>1</Text>
                           // )
                           // :
                           (leave && leave.length)?
                           (
                              <View style={{ }}>
                                 <TouchableOpacity onPress={()=>setModalVisible(true)} >
                                    <View style={{flexDirection: 'row',marginLeft: 20, marginTop: 10 }}>
                                       <FontAwesome5 name="clipboard-list" size={24} color="#008B8B" /> 
                                       <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black',marginLeft: 5}}>Xem</Text>
                                    </View>
                                 </TouchableOpacity>   
                              </View>
                           )
                           :
                           (
                              <View></View>
                           )
                        }
                     
                  </View>
                  <View style={styles.information}> 
                     <View style={{flexDirection: 'row',marginBottom: 15, justifyContent: 'center', marginBottom: 30  }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>ĐƠN XIN NGHỈ</Text>
                     </View>
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15 }}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 3}}>ID</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold', paddingVertical: 3}}>{staff.users.data._id}</Text>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 3}}>Họ và tên:</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold', paddingVertical: 3}}>{staff.users.data.fullnameStaff}</Text>
                     </View>
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Bộ phận</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold', paddingVertical: 3}}>{staff.users.data.department}</Text>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Số điện thoại</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold' , paddingVertical: 3}}>{staff.users.data.numberPhone}</Text>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{flex:1,fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Ngày nghỉ</Text>
                        <ModalDatePicker 
                           locale="en" 
                           onSelect={ (date) => changeDate(date) }
                           isHideOnSelect={true}
                           // initialDate={new Date(Date.now()+1*24*60*60*1000)}
                           button={<Text style={{backgroundColor:'white', fontSize: 17, borderWidth: 0, borderColor: '#228B22',borderRadius: 5,paddingHorizontal: 0, textAlign: 'center', color: 'black',height: 45}}>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>}
                        />
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Lý do</Text>
                        <TextInput onChangeText={(val)=>handleChangeText(val)}  placeholder="Nhập lý do tại đây" style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold' , paddingVertical: 3}}></TextInput>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B'}}>
                        {/* <View style={styles.containerQR}>

                        </View> */}
                     </View> 
                        

                  </View>
                  
                     <TouchableOpacity onPress={()=>onSubmitForm()}>
                        
                        <View style={{ height: 45, backgroundColor: '#008B8B', borderRadius: 8, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center'}}>
                           <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Gửi</Text>
                        </View>
                     </TouchableOpacity>
                 
                  
                  {/* <View style={styles.containerQR} >

                  </View> */}
                  
               {/* </ScrollView> */}
               
               <ModalShowDayLeave isModalVisible={modalVisible} setModalVisible={setModalVisible} idStaff={staff.users.data._id}  />
            </View>
         </LinearGradient>
      </View>
   )
}

export default FormForLeave

const styles = StyleSheet.create({
   container: {
      flex:1,
      
   },
   profile:{
      // alignContent: 'center',
      
   },
   scrollview:{
      height: 300,
   },
   avatar: {
      marginVertical: 10,
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
   },
   information: {
      marginTop: 50,
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'white',
      height: 450
   },
   containerQR: {
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 30,
      backgroundColor: 'white',
      height: 600,
      
      borderWidth: 1
   }
})