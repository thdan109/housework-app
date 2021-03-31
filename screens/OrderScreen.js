import React from 'react';
import {View,Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Moment from 'moment'

import host from '../host'

const {width, height} = Dimensions.get('screen')

const OrderScreen = ({ navigation }) =>{

   React.useEffect( ()=>{
      getOrder()
   },[])

   // const [menu, setMenu] = React.useState(false) 
   const [menu, setMenu] = React.useState({
      status: false,
      idOrder: null
   }) 
   const [ dataCooking, setDataCooking] = React.useState([])
   const [ dataClear, setDataClear] = React.useState([])

   const getOrder = async() =>{
      // console.log('aaa');
      const token_val = await AsyncStorage.getItem('Token')
      // console.log(token_val);
      
      const dataOrder = await axios.get(`${host}/user/getOrder`,{
         headers: {
            Authorization: `Bearer ${token_val}`,
         }
      })
      if (dataOrder.data.orderCooking){
         setDataCooking(dataOrder.data.orderCooking)
      }
      if (dataOrder.data.ordeClear){
         setDataClear(dataOrder.data.ordeClear)
      }
   }

   
   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={{fontSize:20, color: 'white', fontWeight:'bold', textAlign: 'center', marginTop: 30}}>Việc đang chờ</Text>
         </View>

         <View style={{ marginTop: -30 ,height: 600 }} >
         <ScrollView>
            <TouchableOpacity onPress={()=>console.log(dataCooking)}>
               <Text>aaa</Text>
            </TouchableOpacity>
           {
              (dataCooking.length===0) ?
                  <View style={{ height: 600, justifyContent: "center", alignItems: 'center', backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10}} >
                     <Text style={{ fontSize: 16, color: "gray", textAlign:'center'}}>
                       Chưa có việc nào được đăng
                     </Text>
                  </View>
              :
              dataCooking.map((data)=>(
               <View style={styles.renderlist} key={Math.random()}>
                  <View style={{ marginHorizontal: 10, marginVertical: 5}}>
                    <View style={{flexDirection:'row'}}>
                       <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1}} >----------------------------------------------------</Text>
                       {/* <TouchableOpacity onPress={()=>{setMenu(!menu)}} > */}
                       <TouchableOpacity onPress={()=>{setMenu({ status: !menu.status, idOrder: data._id })}} >
                           {( (menu.status === true) && (menu.idOrder === data._id) )?
                              <Entypo name="chevron-up" size={30} color="red" />
                              :
                              <Entypo name="chevron-down" size={30} color="black" />
                           }
                       </TouchableOpacity>
                    </View>
                  {
                     ((menu.status===true) && (dataCooking) && (menu.idOrder == data._id)) &&
                        <View style={styles.details} key={Math.random()}>
                           {/* <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Loại dịch vụ</Text>
                              <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{data.idUser}</Text>
                           </View> */}
                        
                           <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Ngày</Text>
                              <Text  key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{Moment(data.date).format('dddd  DD/MM/YYYY')}</Text>
                           </View>
                           <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Món ăn</Text>
                              <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{" "+data.dishList} </Text>
                           </View>
                           
                           <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Đi chợ</Text>
                              <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{data.goMarket}</Text>
                           </View>

                           <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Thời gian đến</Text>
                              <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.time} </Text>
                           </View>
                           
                           <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Số người ăn</Text>
                              <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.number} </Text>
                           </View>

                           {
                              (data.staff.length != 0)? 
                              <View style={styles.rowdetail} key={Math.random()}>
                              <Text >Nhân viên</Text>
                              <View key={Math.random() } style={{flex: 1}}>
                              {data.staff.map(dt =>
                                    <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                          <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
                                          <TouchableOpacity>
                                             <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} /> 
                                          </TouchableOpacity>
                                    </View>
                              )}
                              </View>
                           </View> 
                              :
                              <View style={styles.rowdetail} key={Math.random()}>
                                 <Text>Nhân viên</Text>
                                 <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                              </View>
                           }
                           
                           <View style={styles.rowdetail} key={Math.random()}>
                              <Text>Tổng tiền</Text>
                              <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
                              <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                              </Text>
                           </View>
                           
                           {/* <View style={styles.rowdetail} key={Math.random()}>
                              <Text >Nhân viên</Text>
                              <View style={{flex: 1}}>
                              {data.staff.map(dt =>
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                          <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
                                          <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color="black" style={{marginLeft: 10}} /> 
                                    </View>
                              )}
                              </View>
                              
                              
                           </View>    */}
                           <View style={{ flexDirection: 'row'}} key={Math.random()}>
                              <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                              <TouchableOpacity>
                                 <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                              </TouchableOpacity>
                           </View>   
                        </View>
                  }
                 </View>
               
               </View>
              ))}
         </ScrollView>  
         </View>
         
      </View>
   )

}

export default OrderScreen;
const styles = StyleSheet.create({
   container:{
      flex:1,
      // backgroundColor: 'black'
   },
   header:{
      height: 120,
      backgroundColor: '#043927',
      
   },
   renderlist: { borderWidth: 1, borderRadius: 10, marginHorizontal: 10, backgroundColor: 'white', marginBottom: 10},

   details: {
      // height: 60
   },
   rowdetail: {
      flexDirection: 'row',
      marginBottom: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.7
      
   }

})