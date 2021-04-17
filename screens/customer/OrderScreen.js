import React from 'react';
import {View,Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, Ionicons } from '@expo/vector-icons';
import {List } from 'react-native-paper'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Moment from 'moment'

import host from '../../host'

const {width, height} = Dimensions.get('screen')

const OrderScreen = ({ navigation }) =>{

   React.useEffect( ()=>{
      getOrder()
   },[])

   const [expanded, setExpanded] = React.useState(true);

   const handlePress = () => setExpanded(!expanded);

   // const [menu, setMenu] = React.useState(false) 
   const [menu, setMenu] = React.useState({
      status: false,
      idOrder: null
   }) 
   const [menuClear, setMenuClear] = React.useState({
      status: false,
      idOrder: null
   }) 
   const [menuWashing, setMenuWashing] = React.useState({
      status: false,
      idOrder: null
   })

   const [ dataCooking, setDataCooking] = React.useState([])
   const [ dataClear, setDataClear] = React.useState([])
   const [ dataWashing, setDataWashing]= React.useState([])

   const getOrder = async() =>{
      // console.log('aaa');
      const token_val = await AsyncStorage.getItem('Token')
      // console.log(token_val);
      
      const dataOrder = await axios.get(`${host}/user/getOrder`,{
         headers: {
            Authorization: `Bearer ${token_val}`,
         }
      })
      if (dataOrder.data.orderClear){
         setDataClear(dataOrder.data.orderClear)
      }
      if (dataOrder.data.orderCooking){
         setDataCooking(dataOrder.data.orderCooking)
      }
      if (dataOrder.data.orderWashing){
         setDataWashing(dataOrder.data.orderWashing)
      }
      // console.log(dataWashing);
   }

   
   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={{fontSize:20, color: 'white', fontWeight:'bold', textAlign: 'center', marginTop: 30}}>Việc của bạn</Text>
         </View>

         <View style={{ marginTop: -30 ,height: 600 }} >
         <ScrollView>
            <View style={{marginVertical: 10}}>

            </View>
            {/* <TouchableOpacity onPress={()=>getOrder()}>
               <Text>aaa</Text>
            </TouchableOpacity> */}
           {
            //    ((dataCooking.length===0) &&  (dataClear.length===0) && (dataWashing.length===0)) ?
            //       <View style={{ height: 600, justifyContent: "center", alignItems: 'center', backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10}} >
            //          <Text style={{ fontSize: 16, color: "gray", textAlign:'center'}}>
            //            Chưa có việc nào được đăng
            //          </Text>
            //       </View>
            //   :
            //    (dataCooking.length !== 0) &&
            //       dataCooking.map((data)=>(
            //          <View style={styles.renderlist} key={Math.random()}>
            //             <View style={{ marginHorizontal: 10, marginVertical: 5}}>
            //             <View style={{flexDirection:'row'}}>
            //                <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1}} >----------------------------------------------------</Text>
            //                {/* <TouchableOpacity onPress={()=>{setMenu(!menu)}} > */}
            //                <TouchableOpacity onPress={()=>{setMenu({ status: !menu.status, idOrder: data._id })}} >
            //                      {( (menu.status === true) && (menu.idOrder === data._id) )?
            //                         <Entypo name="chevron-up" size={30} color="red" />
            //                         :
            //                         <Entypo name="chevron-down" size={30} color="black" />
            //                      }
            //                </TouchableOpacity>
            //             </View>
            //             {
            //                ((menu.status===true) && (dataCooking) && (menu.idOrder == data._id)) &&
            //                   <View style={styles.details} key={Math.random()}>
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Ngày</Text>
            //                         <Text  key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{Moment(data.date).format('dddd  DD/MM/YYYY')}</Text>
            //                      </View>
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Món ăn</Text>
            //                         <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{" "+data.dishList} </Text>
            //                      </View>
                                 
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Đi chợ</Text>
            //                         <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{data.goMarket}</Text>
            //                      </View>

            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Thời gian đến</Text>
            //                         <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.time} </Text>
            //                      </View>
                                 
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Số người ăn</Text>
            //                         <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.number} </Text>
            //                      </View>

            //                      {
            //                         (data.staff.length != 0)? 
            //                         <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text >Nhân viên</Text>
            //                         <View key={Math.random() } style={{flex: 1}}>
            //                         {data.staff.map(dt =>
            //                               <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
            //                                     <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
            //                                     <TouchableOpacity>
            //                                        <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} /> 
            //                                     </TouchableOpacity>
            //                               </View>
            //                         )}
            //                         </View>
            //                      </View> 
            //                         :
            //                         <View style={styles.rowdetail} key={Math.random()}>
            //                            <Text>Nhân viên</Text>
            //                            <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
            //                         </View>
            //                      }
                                 
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Tổng tiền</Text>
            //                         <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
            //                         <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
            //                         </Text>
            //                      </View>
                                 
            //                      {/* <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text >Nhân viên</Text>
            //                         <View style={{flex: 1}}>
            //                         {data.staff.map(dt =>
            //                               <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
            //                                     <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
            //                                     <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color="black" style={{marginLeft: 10}} /> 
            //                               </View>
            //                         )}
            //                         </View>
                                    
                                    
            //                      </View>    */}
            //                      <View style={{ flexDirection: 'row'}} key={Math.random()}>
            //                         <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
            //                         <TouchableOpacity>
            //                            <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
            //                         </TouchableOpacity>
            //                      </View>   
            //                   </View>
            //             }
            //          </View>
                  
            //       </View>
            //    ))

            



            }
            {
               // ((dataCooking.length===0) &&  (dataClear.length===0) && (dataWashing.length===0)) &&
               //       <View style={{ height: 600, justifyContent: "center", alignItems: 'center', backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10}} >
               //          <Text style={{ fontSize: 16, color: "gray", textAlign:'center'}}>
               //            Chưa có việc nào được đăng
               //          </Text>
               //       </View>
            } 
            {
                  // (dataCooking.length !== 0) &&
                  //    dataCooking.map((data)=>(
                  //       <View style={styles.renderlist} key={Math.random()}>
                  //          <View style={{ marginHorizontal: 10, marginVertical: 5}}>
                  //          <View style={{flexDirection:'row'}}>
                  //             <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1}} >----------------------------------------------------</Text>
                  //             <TouchableOpacity onPress={()=>{setMenu({ status: !menu.status, idOrder: data._id })}} >
                  //                   {( (menu.status === true) && (menu.idOrder === data._id) )?
                  //                      <Entypo name="chevron-up" size={30} color="red" />
                  //                      :
                  //                      <Entypo name="chevron-down" size={30} color="black" />
                  //                   }
                  //             </TouchableOpacity>
                  //          </View>
                  //          {
                  //             ((menu.status===true) && (dataCooking) && (menu.idOrder == data._id)) &&
                  //                <View style={styles.details} key={Math.random()}>
                  //                   <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text>Ngày</Text>
                  //                      <Text  key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{Moment(data.date).format('dddd  DD/MM/YYYY')}</Text>
                  //                   </View>
                  //                   <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text>Món ăn</Text>
                  //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{" "+data.dishList} </Text>
                  //                   </View>
                                    
                  //                   <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text>Đi chợ</Text>
                  //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{data.goMarket}</Text>
                  //                   </View>
   
                  //                   <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text>Thời gian đến</Text>
                  //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.time} </Text>
                  //                   </View>
                                    
                  //                   <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text>Số người ăn</Text>
                  //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.number} </Text>
                  //                   </View>
   
                  //                   {
                  //                      (data.staff.length != 0)? 
                  //                      <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text >Nhân viên</Text>
                  //                      <View key={Math.random() } style={{flex: 1}}>
                  //                      {data.staff.map(dt =>
                  //                            <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                  //                                  <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
                  //                                  <TouchableOpacity>
                  //                                     <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} /> 
                  //                                  </TouchableOpacity>
                  //                            </View>
                  //                      )}
                  //                      </View>
                  //                   </View> 
                  //                      :
                  //                      <View style={styles.rowdetail} key={Math.random()}>
                  //                         <Text>Nhân viên</Text>
                  //                         <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                  //                      </View>
                  //                   }
                                    
                  //                   <View style={styles.rowdetail} key={Math.random()}>
                  //                      <Text>Tổng tiền</Text>
                  //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
                  //                      <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                  //                      </Text>
                  //                   </View>  
                  //                   <View style={{ flexDirection: 'row'}} key={Math.random()}>
                  //                      <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                  //                      <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen') } >
                  //                         <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                  //                      </TouchableOpacity>
                  //                   </View>   
                  //                </View>
                  //          }
                  //       </View>
                     
                  //    </View>
                  // ))
            }
            {
            //    (dataClear.length !== 0) &&
            //    dataClear.map((data)=>(
            //       <View style={styles.renderlist} key={Math.random()}>
            //          <View style={{ marginHorizontal: 10, marginVertical: 5}}>
            //          <View style={{flexDirection:'row'}}>
            //             <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1}} >----------------------------------------------------</Text>
            //             <TouchableOpacity onPress={()=>{setMenuClear({ status: !menuClear.status, idOrder: data._id })}} >
            //                   {( (menuClear.status === true) && (menuClear.idOrder === data._id) )?
            //                      <Entypo name="chevron-up" size={30} color="red" />
            //                      :
            //                      <Entypo name="chevron-down" size={30} color="black" />
            //                   }
            //             </TouchableOpacity>
            //          </View>
            //          {
            //             ((menuClear.status===true) && (dataClear) && (menuClear.idOrder == data._id)) &&
            //                <View style={styles.details} key={Math.random()}>
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Ngày</Text>
            //                      <Text  key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{Moment(data.date).format('dddd  DD/MM/YYYY')}</Text>
            //                   </View>
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Diện tích</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{data.area} M2</Text>
            //                   </View>
                              
                              

            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Thời gian đến</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeStart} </Text>
            //                   </View>
                              
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Thời gian làm việc</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeWork} </Text>
            //                   </View>
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Số phòng</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.numRoom} </Text>
            //                   </View>
            //                   {
            //                      (data.nameStaff.length != 0)? 
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text >Nhân viên</Text>
            //                      <View key={Math.random() } style={{flex: 1}}>
            //                      {data.nameStaff.map(dt =>
            //                            <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
            //                                  <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
            //                                  <TouchableOpacity>
            //                                     <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} /> 
            //                                  </TouchableOpacity>
            //                            </View>
            //                      )}
            //                      </View>
            //                   </View> 
            //                      :
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Nhân viên</Text>
            //                         <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
            //                      </View>
            //                   }
                              
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Tổng tiền</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
            //                      <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
            //                      </Text>
            //                   </View>
                              
                            
            //                   <View style={{ flexDirection: 'row'}} key={Math.random()}>
            //                      <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
            //                      <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen') }>
            //                         <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
            //                      </TouchableOpacity>
            //                   </View>   
            //                </View>
            //          }
            //       </View>
               
            //    </View>
            // ))
            }
            {
            //    (dataWashing.length !== 0) &&
            //    dataWashing.map((data)=>(
            //       <View style={styles.renderlist} key={Math.random()}>
            //          <View style={{ marginHorizontal: 10, marginVertical: 5}}>
            //          <View style={{flexDirection:'row'}}>
            //             <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1}} >----------------------------------------------------</Text>
            //             {/* <TouchableOpacity onPress={()=>{setMenu(!menu)}} > */}
            //             <TouchableOpacity onPress={()=>{setMenuWashing({ status: !menuWashing.status, idOrder: data._id })}} >
            //                   {( (menuWashing.status === true) && (menuWashing.idOrder === data._id) )?
            //                      <Entypo name="chevron-up" size={30} color="red" />
            //                      :
            //                      <Entypo name="chevron-down" size={30} color="black" />
            //                   }
            //             </TouchableOpacity>
            //          </View>
            //          {
            //             ((menuWashing.status===true) && (dataWashing) && (menuWashing.idOrder == data._id)) &&
            //                <View style={styles.details} key={Math.random()}>
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Ngày nhận</Text>
            //                      <Text  key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{Moment(data.dateSend).format('dddd  DD/MM/YYYY')}</Text>
            //                   </View>
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Ngày trả</Text>
            //                      <Text  key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{Moment(data.dateTake).format('dddd  DD/MM/YYYY')}</Text>
            //                   </View>
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Diện tích</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>{data.area} M2</Text>
            //                   </View>
                             

            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Thời gian nhận</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeSend} </Text>
            //                   </View>
                              
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Thời gian trả</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeTake} </Text>
            //                   </View>
                     
            //                   {
            //                      (data.staff.length != 0)? 
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text >Nhân viên</Text>
            //                      <View key={Math.random() } style={{flex: 1}}>
            //                      {data.staff.map(dt =>
            //                            <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
            //                                  <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
            //                                  <TouchableOpacity>
            //                                     <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} /> 
            //                                  </TouchableOpacity>
            //                            </View>
            //                      )}
            //                      </View>
            //                   </View> 
            //                      :
            //                      <View style={styles.rowdetail} key={Math.random()}>
            //                         <Text>Nhân viên</Text>
            //                         <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
            //                      </View>
            //                   }
                              
            //                   <View style={styles.rowdetail} key={Math.random()}>
            //                      <Text>Tổng tiền</Text>
            //                      <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
            //                      <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
            //                      </Text>
            //                   </View>
                              
                            
            //                   <View style={{ flexDirection: 'row'}} key={Math.random()}>
            //                      <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
            //                      <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen') }>
            //                         <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
            //                      </TouchableOpacity>
            //                   </View>   
            //                </View>
            //          }
            //       </View>
               
            //    </View>
            // ))
            }
            {
               (dataClear.length === 0) && (dataCooking.length === 0) && (dataWashing.length === 0)?
                  <View style={{ height: 600, justifyContent: "center", alignItems: 'center', backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10}} >
                     <Text style={{ fontSize: 16, color: "gray", textAlign:'center'}}>
                        Chưa có việc nào được đăng
                     </Text>
                  </View>
               :
               (dataClear.length === 0 )?<View></View>:
               <View style={styles.containerWork}>
                  <List.Section title="Dọn nhà"  >
                     {
                        dataClear.map(data =>(
                           
                           <List.Accordion
                              key={Math.random()}
                              title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                              left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                           >
                              <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)'}} >
                                 
                                 <View style={styles.rowdetail} key={Math.random()}>
                                    <Text style={{fontSize: 16}}>Diện tích</Text>
                                    <Text key={Math.random()} style={{flex:1, textAlign: "right", fontWeight: 'bold', fontSize: 16}}>{Number(data.area)*100} M2</Text>
                                 </View>
                                 <View style={styles.rowdetail} key={Math.random()}>
                                    <Text style={{fontSize: 16}}>Thời gian đến</Text>
                                    <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeStart} </Text>
                                 </View>
                                 
                                 <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Thời gian làm việc</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeWork} </Text>
                                 </View>
                                 <View style={styles.rowdetail} key={Math.random()}>
                                    <Text style={{fontSize: 16}}>Số phòng</Text>
                                    <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.numRoom} </Text>
                                 </View>
                                 <View style={styles.rowdetail} key={Math.random()}>
                                    <Text style={{fontSize: 16}}>Trạng thái</Text>
                                    <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.status} </Text>
                                 </View>
                                 <View style={styles.rowdetail} key={Math.random()}>
                                    <Text  style={{fontSize: 16}}>Tổng tiền</Text>
                                    <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
                                    <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                    </Text>
                                 </View>
                                 {
                                    (data.nameStaff.length != 0)? 
                                    <View style={styles.rowdetail} key={Math.random()}>
                                    <Text style={{fontSize: 16}} >Nhân viên</Text>
                                    <View key={Math.random() } style={{flex: 1}}>
                                       {data.nameStaff.map(dt =>
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
                                       <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                       <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                    </View>
                                 }
                                 <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                 <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                 <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen') }>
                                    <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                 </TouchableOpacity>
                              </View>  
                              </View>

                           </List.Accordion>
                  
                        ))
                     }
                     
                  </List.Section>
               </View>
            }
         
            {
               (dataWashing.length === 0)? <View></View>:
               <View style={styles.containerWork}>
                  <List.Section title="Giặt ủi"  >
                     {
                        dataWashing.map(data =>(
                           
                              <List.Accordion
                                 key={Math.random()}
                                 title={Moment(data.timeTake).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)'}} >
                                    
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Ngày nhận</Text>
                                       <Text key={Math.random()} style={{flex:1, textAlign: "right", fontWeight: 'bold', fontSize: 16}}>{Moment(data.dateSend).format('dddd  DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Ngày trả</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {Moment(data.dateTake).format('dddd  DD/MM/YYYY')} </Text>
                                    </View>
                                    
                                    <View style={styles.rowdetail} key={Math.random()}>
                                          <Text style={{fontSize: 16}}>Thời gian nhận</Text>
                                          <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeSend} </Text>
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Thời gian trả</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.timeTake} </Text>
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text  style={{fontSize: 16}}>Tổng tiền</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
                                       <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                       </Text>
                                    </View>
                                    {
                                       (data.staff.length != 0)? 
                                       <View style={styles.rowdetail} key={Math.random()}>
                                       <Text  style={{fontSize: 16}} >Nhân viên</Text>
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
                                          <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                          <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                       </View>
                                    }
                                    <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                    <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                    <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen') }>
                                       <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                    </TouchableOpacity>
                                 </View>  
                                 </View>

                              </List.Accordion>
                  
                        ))
                     }
                     
                  </List.Section>
               </View>
               
            }

            {
               (dataCooking.length === 0)? <View></View>:
               <View style={styles.containerWork}>
                  <List.Section title="Nấu ăn"  >
                     {
                        dataCooking.map(data =>(
                           
                              <List.Accordion
                                 key={Math.random()}
                                 title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)'}} >
                                    
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Món ăn</Text>
                                       <View style={{ flex:1}}>
                                          {
                                             data.dishList.map(dt=>
                                                <Text key={Math.random()} style={{ textAlign: "right", fontWeight: 'bold', fontSize: 16}}>{dt}</Text>          
                                             )
                                          }
                                       </View>
                                       
                                       
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Số người ăn</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>  {data.number}</Text>
                                    </View>
                                    
                                    <View style={styles.rowdetail} key={Math.random()}>
                                          <Text style={{fontSize: 16}}>Đi chợ</Text>
                                          <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.goMarket} </Text>
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Trái cây</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.fruit} </Text>
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Trạng thái</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.status} </Text>
                                    </View>
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text  style={{fontSize: 16}}>Tổng tiền</Text>
                                       <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>
                                       <NumberFormat key={Math.random()} value={data.money} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                       </Text>
                                    </View>
                                    {
                                       (data.staff.length != 0)? 
                                       <View style={styles.rowdetail} key={Math.random()}>
                                       <Text  style={{fontSize: 16}} >Nhân viên</Text>
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
                                          <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                          <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                       </View>
                                    }
                                    <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                    <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                    <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen') }>
                                       <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                    </TouchableOpacity>
                                 </View>  
                                 </View>

                              </List.Accordion>
                  
                        ))
                     }
                     
                  </List.Section>
               </View>
            }
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
   containerWork: {
      // borderWidth: 1,
      // borderTopRightRadius: 30,
      marginHorizontal: 20,
      backgroundColor: 'white',
      marginTop: -30,
      marginBottom: 30,
   },
   rowdetail: {
      flexDirection: 'row',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 20
      // borderBottomColor: 'gray',
      // borderBottomWidth: 0.7
      
   }

})