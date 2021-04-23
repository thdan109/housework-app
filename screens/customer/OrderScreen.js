import React from 'react';
import {View,Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, Ionicons } from '@expo/vector-icons';
import {List } from 'react-native-paper'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import host from '../../host'
import { addWorkCooking, addWorkWashing, addWorkClear } from '../../action/workAction';

const {width, height} = Dimensions.get('screen')

const OrderScreen = ({ navigation,props }) =>{
   const [isLoad,setIsLoad] = React.useState(true)


   React.useEffect( ()=>{
      getOrder()
   },[isLoad])
   
   const dispatch = useDispatch()
   const work = useSelector(state => state)
   
   const [expanded, setExpanded] = React.useState(true);

   const handlePress = () => setExpanded(!expanded);
  

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
         dispatch(addWorkClear(dataOrder.data.orderClear))
      }
      if (dataOrder.data.orderCooking){
         setDataCooking(dataOrder.data.orderCooking)
         dispatch(addWorkCooking(dataOrder.data.orderCooking))
   
      }
      if (dataOrder.data.orderWashing){
         setDataWashing(dataOrder.data.orderWashing)
         dispatch(addWorkWashing(dataOrder.data.orderWashing))
      }
      // console.log(dataWashing);
   }

const confirmWork = async ( id,typee ) =>{
      const idWork = id
      const type = typee
      const status = "Chờ thu tiền"
      // console.log(idWork, type);
      if ( type === "clear" ){
         await axios.post(`${host}/clear/confirmWork`,{
            id : idWork,
            status: status
         }).then(res =>{
            
            // getOrder()
            setIsLoad(!isLoad)
            // console.log("áda");

         })
         
      }else if ( type==="cooking" ){
         await axios.post(`{host}/cooking/confirmWork`,{
            id: idWork,
            status: status
         }).then(res=>{
            // getOrder()
      setIsLoad(!isLoad)
      // console.log("áda");

         })
         
      }else if( type==="washing"){
         await axios.post(`${host}/washing/confirmWork`,{
            id: idWork,
            status: status
         }).then(res =>{
            // getOrder()
      setIsLoad(!isLoad)
      // console.log("áda");

         })
         
      }
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
           
            {/* {
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
                  <Text onPress={()=>console.log(work.works.clearList)}>aaaaaaaaa</Text>
                     {
                        dataClear.map(data =>(
                           
                           <List.Accordion
                              key={Math.random()}
                              title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                              left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                           >
                              <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                 
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
                                    <View>
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
                                    <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                       <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                       <TouchableOpacity onPress={()=> {navigation.navigate('ScanQRScreen', {idWork: data._id, type: "clear",staff: data.idStaff})} }>
                                          <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                       </TouchableOpacity>
                                    </View> 
                                    </View>
                                    :
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                       <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                    </View>
                                 }
                                
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
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                    
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
                                       <View>
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
                                          <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                             <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                             <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen',{idWork: data._id, type: "washing"}) }>
                                                <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                             </TouchableOpacity>
                                          </View> 
                                       </View>
                                       :
                                       <View style={styles.rowdetail} key={Math.random()}>
                                          <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                          <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                       </View>
                                    }
                                   
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
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                    
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
                                       <View>
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
                                       <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                          <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                          <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen',{idWork: data._id, type: "cooking"}) }>
                                             <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                          </TouchableOpacity>
                                       </View> 
                                       </View>
                                       :
                                       <View style={styles.rowdetail} key={Math.random()}>
                                          <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                          <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                       </View>
                                    }
                                     
                                 </View>

                              </List.Accordion>
                  
                        ))
                     }
                     
                  </List.Section>
               </View>
            } */}
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
                        work.works.clearList.map(dt =>(
                           dt.map(data =>(
                           <List.Accordion
                              key={Math.random()}
                              title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                              left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                           >
                              <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                 
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
                                    <View>
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
                                    <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                       <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                       <TouchableOpacity onPress={()=> {navigation.navigate('ScanQRScreen', {idWork: data._id, type: "clear",staff: data.idStaff})} }>
                                          <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                       </TouchableOpacity>
                                    </View> 
                                    </View>
                                    :
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                       <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                    </View>
                                 }
                                 {/* <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}> */}
                                    {
                                       (data.status === "Đang thực hiện")?
                                          (<TouchableOpacity onPress = {()=> confirmWork(data._id,"clear")} >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hoàn thành</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :
                                       (
                                          <View></View>
                                       )
                                    }
                                    
                                 </View>  
                              {/* </View> */}

                           </List.Accordion>
                           ))
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
                        work.works.washingList(dt =>(
                           dt.map(data =>(
                              <List.Accordion
                                 key={Math.random()}
                                 title={Moment(data.timeTake).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                    
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
                                       <View>
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
                                          <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                             <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                             <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen',{idWork: data._id, type: "washing"}) }>
                                                <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                             </TouchableOpacity>
                                          </View> 
                                       </View>
                                       :
                                       <View style={styles.rowdetail} key={Math.random()}>
                                          <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                          <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                       </View>
                                    }
                                    {
                                       (data.status === "Đang thực hiện")?
                                          (<TouchableOpacity >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hoàn thành</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :
                                       (
                                          <View></View>
                                       )
                                    }
                                 </View>

                              </List.Accordion>
                           ))
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
                        work.works.cookingList.map(dt=>(
                           dt.map(data =>(
                              <List.Accordion
                                 key={Math.random()}
                                 title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                    
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
                                       <View>
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
                                       <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                          <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                          <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen',{idWork: data._id, type: "cooking"}) }>
                                             <Ionicons name="md-qr-code-sharp" size={24} color="#1E90FF" />
                                          </TouchableOpacity>
                                       </View> 
                                       </View>
                                       :
                                       <View style={styles.rowdetail} key={Math.random()}>
                                          <Text  style={{fontSize: 16}}>Nhân viên</Text>
                                          <Text style={{flex:1,textAlign: "right", fontWeight: 'bold'}}>Đang xử lý</Text>
                                       </View>
                                    }
                                    {
                                       (data.status === "Đang thực hiện")?
                                          (<TouchableOpacity  >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hoàn thành</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :
                                       (
                                          <View></View>
                                       )
                                    }
                                 </View>

                              </List.Accordion>
                           ))
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