import React from 'react'
import {StatusBar, View, Text, Dimentions, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import host from '../../host'
import axios from 'axios'
import {useSelector} from 'react-redux'
const SalaryStaffScreen = ({ navigation}) =>{

   const staff = useSelector(state => state)

   React.useEffect(() =>{
      getDataSalary()
      getDataSalaryById()
   },[])


   const [data, setData ] = React.useState()
   const [dataSalary, setDataSalary] = React.useState()


   const getDataSalary = async() =>{
      const data = await axios.post(`${host}/salary/dataForAppStaff`)
      setData(data.data)
   }

   const getDataSalaryById = async() =>{
      const id = staff.users.data._id
      const dataSalary = await axios.post(`${host}/salary/getDataSalaryByIdStaff`,{
         idStaff: id
      })
      setDataSalary(dataSalary.data)
   } 

   return(
      <View style={styles.container}>
         <StatusBar/>
         <View style={styles.header}>
            <View style={styles.headerTitle}>
               <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Ionicons name="chevron-back" size={36} color="black" style={{marginLeft: 10}} />
               </TouchableOpacity>
            </View>
            <Text style={{alignItems: 'center', textAlign: 'center', justifyContent: 'center', fontSize: 20 , fontWeight: 'bold', marginTop: 20}} >LƯƠNG</Text>
         </View>
         <View style={styles.containerbody}>
            {
               data?.map(dt =>(

                  <View style={styles.note} key={Math.random()} >
                     <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text 
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Chỉ tiêu: </Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.target} việc/tháng</Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Công nhận: </Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.work}</Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text 
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                           }}>Thưởng vượt chỉ tiêu</Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.bonus *100} %</Text>
                     </View>
                     
                     <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Nghỉ</Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.absent * 100} % </Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Tổng</Text>
                        <Text style={{fontWeight: 'bold'}}>Việc + Số việc vượt  - nghỉ</Text>
                     </View>
                  
                  </View>
               ))
            }

            <View style={styles.containerFlatlist}>  
                  <FlatList 
                     showsVerticalScrollIndicator={false}
                     showsHorizontalScrollIndicator={false}
                     // style={styles.Flatlist}
                     data={dataSalary}
                     keyExtractor={item => item._id}
                     renderItem={({item,index}) =>(
                        <View style={styles.renderFlatlist} >
                           <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: 'bold', fontSize: 16, flex:1}}>{Moment(item.date).format('dddd  DD/MM/YYYY')}</Text>
                              <Text style={{fontSize: 14, marginTop: 10}}> Số ngày nghỉ: {item.absent}</Text>
                              <Text style={{fontSize: 14, marginTop: 10}}> Số việc: {item.work}</Text>
                              <Text style={{fontSize: 14, marginTop: 10, fontWeight: 'bold'}}> Lương: {item.salary}</Text>
                           </View>
                           
                           <Text style={{fontSize: 14, marginTop: 10}}>{item.contentfeedback}</Text>
                           
                           
                        </View>
                        
                     )}
                  />

            </View>
            
         </View>


      </View>



   )


}


export default SalaryStaffScreen




const styles = StyleSheet.create({

   container:{
      flex:1
   },
   header:{
      height: 120,
      // borderWidth: 1,
      backgroundColor: '#FFDEAD',
   },
   headerTitle:{
      height: 36,
      backgroundColor: '#DEB887'
   },
   containerbody:{
      flex:1,
   },
   note:{
      // borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: 'rgba(230,230,230,0.8)'
   }




})