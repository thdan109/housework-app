import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, Dimensions, StyleSheet,ScrollView, Image} from 'react-native' 
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ModalShowQR from '../../components/staff/ModalShowQR'
import host from '../../host'

const {width, height} = Dimensions.get('screen')

const ProfileStaff = ({navigation}) =>{

   React.useEffect(()=>{
      // getDataWork()
   },[])

   const staff = useSelector(state=>state)
   const [modalVisible, setModalVisible] = React.useState(false);
   
   return(
      <View style={styles.container} >
         <LinearGradient style={{flex:1}} colors={["#FFEBCD","#FFEBCD"]} >
            <View style={styles.profile}  > 
               
               <View style={{ flexDirection: 'row', height: 40, paddingTop: 5, paddingHorizontal: 10, backgroundColor: '#FFDEAD' }}>
                  <TouchableOpacity onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="arrow-back-sharp" size={28} color="black" />
                  </TouchableOpacity>
                  <View style={{flex:1}}>
                     
                        <Text style={{fontSize: 19, fontWeight: 'bold', color: 'black', textAlign: 'center'}} > Hồ sơ nhân viên </Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                     setModalVisible(true);
                  }}>
                     <Ionicons name="qr-code-sharp" size={28} color="black" style={{paddingRight: 5}} />
                  </TouchableOpacity>
                  
               </View>

               <View style={styles.avatar}>
                     <View style={{backgroundColor: 'white', height: 118, width: 118, borderRadius: 65, borderColor: 'white', borderWidth: 3   }}>
                        <Image source={{uri: `${host}/${staff.users.data.avatarStaff}` }} style={{ flex: 1,  borderRadius: 80}} />
                     </View>
               </View>

               {/* <ScrollView style={styles.scrollview} > */}
                  <View style={styles.information}> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15 }}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 3}}>ID</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold', paddingVertical: 3}}>{staff.users.data._id}</Text>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 3}}>Họ và tên:</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold', paddingVertical: 3}}>{staff.users.data.fullnameStaff}</Text>
                     </View>
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Giới tính</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold' , paddingVertical: 3}}>{staff.users.data.sex}</Text>
                     </View>
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Bộ phận</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold', paddingVertical: 3}}>{staff.users.data.department}</Text>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Quê quán</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold' , paddingVertical: 3}}>{staff.users.data.addressStaff}</Text>
                     </View>
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B', borderBottomWidth: 0.8, marginBottom: 15}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold' , paddingVertical: 3}}>Số điện thoại</Text>
                        <Text style={{fontSize: 16, flex:1, textAlign: 'right', fontWeight: 'bold' , paddingVertical: 3}}>{staff.users.data.numberPhone}</Text>
                     </View> 
                     <View style={{flexDirection: 'row', borderBottomColor: '#008B8B'}}>
                        {/* <View style={styles.containerQR}>

                        </View> */}
                     </View> 
                        

                  </View>
                  
                  {/* <View style={styles.containerQR} >

                  </View> */}
                  
               {/* </ScrollView> */}
               
               <ModalShowQR isModalVisible={modalVisible} setModalVisible={setModalVisible} />
            </View>
         </LinearGradient>
      </View>
   )
}

export default ProfileStaff

const styles = StyleSheet.create({
   container: {
      flex:1
   },
   profile:{
      
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
      // alignItems: 'center', 
      // borderWidth:1,
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 30,
      backgroundColor: 'white',
      height: 350
   },
   containerQR: {

      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 30,
      backgroundColor: 'white',
      height: 200,
      width: 200,
      borderWidth: 1
   }
})