import React from 'react'
import {StatusBar, View, Text, Dimentions, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import host from '../../host'
import axios from 'axios'
import Moment from 'moment'
import {useSelector} from 'react-redux'
const SalaryStaffScreen = ({ navigation}) =>{

   const staff = useSelector(state => state)

   React.useEffect(() =>{
      getDataSalary()
      getDataSalaryById()
   },[])


   const [data, setData ] = React.useState()
   const [dataSalary1, setDataSalary] = React.useState()


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
      console.log(dataSalary.data);
   } 

   return(
      <View style={styles.container}>
         <StatusBar/>
         <View style={styles.header}>
            <View style={styles.headerTitle}>
               <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Ionicons name="chevron-back" size={36} color="black" style={{marginLeft: 10}} />
               </TouchableOpacity>
               <Text style={{flex:1, fontSize: 20, marginTop: 5 , fontWeight: 'bold', justifyContent: 'center',textAlign: 'center'}} >LƯƠNG</Text>
               <Ionicons name="chevron-back" size={36} color="black" style={{marginLeft: 10, opacity:0}} />
            </View>
            
         </View>
         <View style={styles.containerbody}>
            {
               data?.map(dt =>(

                  <View style={styles.note} key={Math.random()} >
                     <View style={{flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text 
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Chỉ tiêu: </Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.target} việc/tháng</Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Công nhận: </Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.work}</Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text 
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                           }}>Thưởng vượt chỉ tiêu</Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.bonus *100} %</Text>
                     </View>
                     
                     <View style={{flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Nghỉ</Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.absent * 100} % </Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Lương</Text>
                        <Text style={{fontWeight: 'bold'}}>{dt.salary}</Text>
                     </View>

                     <View style={{flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5}}>
                        <Text
                           key={Math.random()}
                           style={{
                              flex:1,
                              fontSize: 16,
                              // fontWeight: 'bold'
                        }}>Tổng</Text>
                        <Text style={{fontWeight: 'bold'}}>Lương + Việc + Số việc vượt - nghỉ</Text>
                     </View>
                  
                  </View>
               ))
            }

            <View style={styles.containerFlatlist}>  
         {/* <Text>aaaaaaaaa{dataSalary1.salary}</Text> */}
            {
               dataSalary1? 
                  <FlatList 
                     showsVerticalScrollIndicator={false}
                     showsHorizontalScrollIndicator={false}
                     // style={styles.Flatlist}
                     data={dataSalary1}
                     keyExtractor={item => item._id}
                     renderItem={({item,index}) =>(
                        <View style={styles.renderFlatlist} >
                           <View style={{ backgroundColor: '#37474f', marginTop: 10, paddingHorizontal: 10, paddingVertical:10, borderRadius: 5 }}>
                              {/* <Text style={{fontWeight: 'bold', fontSize: 16, flex:1, color: 'white'}}>{Moment(item.date).format('dddd  DD/MM/YYYY')}</Text> */}
                              <View >
                                 {/* <Text style={{fontWeight: 'bold', fontSize: 16, flex:1, color: 'white'}}>{Moment(item.date).format('dddd  DD/MM/YYYY')}</Text> */}
                                 <Text style={{fontWeight: 'bold', fontSize: 16, flex:1, color: 'white', textAlign: 'right'}}>{Moment(item.date).format('dddd  DD/MM/YYYY')}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white'}}>Số ngày nghỉ</Text>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white', flex:1, textAlign: 'right'}}>{item.absent}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white'}}>Tiền trên việc</Text>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white', flex:1, textAlign: 'right'}}>{item.work}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white'}}>Lương</Text>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white', flex:1, textAlign: 'right'}}>{item.salary} VNĐ</Text>
                              </View>
                              {/* <Text style={{fontSize: 14, marginTop: 10, color: 'white'}}> Số việc: {item.work}</Text>
                              <Text style={{fontSize: 14, marginTop: 10, fontWeight: 'bold', color: 'white'}}> Lương: {item.salary}</Text> */}
                           </View>
                           <Text style={{fontSize: 14, marginTop: 10}}>{item.contentfeedback}</Text>
                        </View>
                        
                     )}
                  />
                  :
                  <View></View>
            }

                  

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
      height: 36,
      // borderWidth: 1,
      backgroundColor: '#FFDEAD',
   },
   headerTitle:{
      height: 36,
      backgroundColor: '#DEB887',
      flexDirection: 'row',
      
   },
   containerbody:{
      flex:1,
   },
   note:{
      // borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: 'rgba(230,230,230,0.8)'
   },
   renderFlatlist:{
      padding: 10
   }




})