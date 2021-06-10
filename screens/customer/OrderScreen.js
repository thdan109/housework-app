import React from 'react';
import {View,Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView,RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {List } from 'react-native-paper'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import host from '../../host'
import { addWorkCooking, addWorkWashing, addWorkClear } from '../../action/workAction';
import ModalReportStaff from '../../components/customer/ModalReportStaff';
import ModalFeedback from '../../components/customer/ModalFeedback';


const {width, height} = Dimensions.get('screen')



const wait = (timeout) => {
   return new Promise(resolve => setTimeout(resolve, timeout));
 }

const OrderScreen = ({ navigation,props }) =>{
   const [isLoad,setIsLoad] = React.useState(true)

   const [refreshing, setRefreshing] = React.useState(false);
   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() =>{ setRefreshing(false)
                             getOrder()
      });
    }, []);

   React.useEffect( ()=>{
      getOrder()
   },[isLoad])
   
   const dispatch = useDispatch()
   const work = useSelector(state => state)
   const user = useSelector(state =>state)
   
   const [expanded, setExpanded] = React.useState(true);

   const handlePress = () => setExpanded(!expanded);
   const [modalVisible, setModalVisible]=React.useState({visible: false,idStaff: null, idWork: null})
   const [modalVisibleFB, setModalVisibleFB]=React.useState({visible: false, idWork: null,nameUser: null, idUser: null})

   const [ dataCooking, setDataCooking] = React.useState([])
   const [ dataClear, setDataClear] = React.useState([])
   const [ dataWashing, setDataWashing]= React.useState([])
   const [dataChat, setDataChat] =React.useState()

   const handChangemodalVisible = ()=>{
      setModalVisible(pre=>{
         return {...pre, visible: !pre.visible}
      })
   }
   const handChangemodalVisibleFB = ()=>{
      setModalVisibleFB(pre=>{
         return {...pre, visible: !pre.visible}
      })
   }

   const checkFeebback = async ( visible, idUser, idWork, nameUser, typework ) => {
      console.log(typework);
      const checkFB = await axios.post(`${host}/feedback/checkFb`,{
         idUser: idUser
      })
      if (checkFB.data.status === 'No'){
         // setModalVisibleFB({visible: true,idWork: data._id, nameUser: user.users.data.fullname, idUser: user.users.data._id})
         setModalVisibleFB({visible: true,idWork: idWork, nameUser: nameUser, idUser: idUser,type: typework})
      }else{
         setModalVisibleFB({visible: false,idWork: idWork, nameUser: nameUser, idUser: idUser,type: typework})
      }
   }

   const getOrder = async() =>{
      
      const token_val = await AsyncStorage.getItem('Token')
      
      
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
      
   }

   const cancelWork = async(id,typee) =>{
      const idWork = id
      const type = typee
      if ( type === "clear" ){
         await axios.post(`${host}/clear/cancelWork`,{
            id: idWork
         }).then(result =>{
            setIsLoad(!isLoad)
         }).catch(err =>{

         })
      }else if (type === "cooking"){
         await axios.post(`{host}/cooking/cancelWork`,{
            id: idWork
         }).then(result =>{
            setIsLoad(!isLoad)
         }).catch(err =>{

         })
      }else if( type==="washing"){
         await axios.post(`${host}/washing/cancelWork`,{
            id: idWork,
         }).then(res =>{
            setIsLoad(!isLoad)
         })
      }
   }

   const getDataChat = async() =>{
      const idUser = user.users.data._id
      const ListChat = await axios.post(`${host}/chat/listChatUser`,{
         id: idUser
      })
      if (ListChat !== null){
         setDataChat(ListChat.data)
      }else{
         console.log('Loi~');
      }
   }

   const continueWork =async(id, typee) =>{
      const idWork= id
      const type = typee
      const status = "Tiếp tục đặt"
      if ( type === "clear" ){
         await axios.post(`${host}/clear/continueWork`,{
            id : idWork,
            status: status
         }).then(res =>{
            setIsLoad(!isLoad)
         })
         
      }else if ( type==="cooking" ){
         await axios.post(`${host}/cooking/continueWork`,{
            id: idWork,
            status: status
         }).then(res=>{
            setIsLoad(!isLoad)
         })
      }
      // else if( type==="washing"){
      //    await axios.post(`${host}/washing/continueWork`,{
      //       id: idWork,
      //       status: status
      //    }).then(res =>{
      //       setIsLoad(!isLoad)
      //    })
      // }
   }

   const confirmWork = async ( id,typee ) =>{
      const idWork = id
      const type = typee
      const status = "Chờ thu tiền"
      if ( type === "clear" ){
         await axios.post(`${host}/clear/confirmWork`,{
            id : idWork,
            status: status
         }).then(res =>{
            setIsLoad(!isLoad)
         })
         
      }else if ( type==="cooking" ){
         await axios.post(`${host}/cooking/confirmWork`,{
            id: idWork,
            status: status
         }).then(res=>{
            setIsLoad(!isLoad)
         })
      }else if( type==="washing"){
         await axios.post(`${host}/washing/confirmWork`,{
            id: idWork,
            status: status
         }).then(res =>{
            setIsLoad(!isLoad)
         })
      }
   }
   
   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={{fontSize:20, color: 'white', fontWeight:'bold', textAlign: 'center', marginTop: 30}}>Việc của bạn</Text>
         </View>
         
         <View style={{ marginTop: -30 ,height: 600 }} >
         <ScrollView
            refreshControl={
               <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
               />
            }
         >
            <View style={{marginVertical: 10}}>
               
            </View>
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
                           
                              style={{backgroundColor: '#8FBC8B', marginBottom: 10}}
                              key={Math.random()}
                              title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                              left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                           >
                              {/* <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} > */}
                              <View key={Math.random()} style={{backgroundColor: '#F0FFF0', paddingVertical: 10}} > 
                                 <View style={styles.rowdetail} key={Math.random()}>
                                    <Text style={{fontSize: 16}}>Diện tích</Text>
                                    <Text key={Math.random()} style={{flex:1, textAlign: "right", fontWeight: 'bold'}}>{Number(data.area)*100} M2</Text>
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
                                 {
                                    data.reqStaff?
                                       <View style={styles.rowdetail} key={Math.random()}>
                                          <Text style={{fontSize: 16}}>Yêu cầu nhân viên</Text>
                                          <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.reqStaff.fullnameStaff} </Text>
                                       </View>
                                    :
                                    <View></View>
                                 }
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
                                          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                             <View>
                                                {data.nameStaff.map(dt =>
                                                   <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                      <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
                                                   </View>
                                                )
                                                }
                                             </View>
                                             <View>
                                                {
                                                   data.idStaff.map(dt1=>
                                                      <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                      <View style={{flexDirection:'row'}}>
                                                         <TouchableOpacity onPress={()=>navigation.navigate('MessagesCustomer')}>
                                                            {/* <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} />  */}
                                                         </TouchableOpacity>
                                                         {
                                                            (data.status !== "Đã xác nhận")?
                                                            <TouchableOpacity onPress={()=> setModalVisible({visible: true, idStaff: dt1, idWork: data._id})}>
                                                               {/* <MaterialIcons name="report" size={24} color="red"  style={{marginLeft: 10}} />  */}
                                                               <MaterialIcons name="star-rate" size={24} color="#FF8C00" style={{marginLeft: 10}} /> 
                                                            </TouchableOpacity>
                                                            :
                                                            <View></View>
                                                         }
                                                      </View>
                                                   </View>
                                                   )
                                                   
                                                }   
                                             </View>
                                          </View>  
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
                                       <Text style={{flex:1, fontWeight: 'bold',textAlign: 'right'}}>Đang xử lý</Text>
                                    </View>
                                 }
                                 {/* <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}> */}
                                    {
                                       (data.status === "Đang thực hiện")?
                                          (<TouchableOpacity 
                                             onPress = {()=> { 
                                                confirmWork(data._id,"clear"),
                                                               // setModalVisibleFB({visible: true,idWork: data._id, nameUser: user.users.data.fullname, idUser: user.users.data._id})
                                                               checkFeebback('a', user.users.data._id,data._id, user.users.data.fullname,  "clear")
                                                            } } 
                                           >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hoàn thành</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :
                                       (data.status === 'Đang chờ xác nhận' || data.status === "Tiếp tục đặt")?
                                          (<TouchableOpacity 
                                             onPress = {()=> { 
                                                cancelWork(data._id, "clear")
                                                            } } 
                                          >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hủy dịch vụ</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :(data.status === 'Đang chờ phản hồi')?
                                          (<View>
                                             <TouchableOpacity 
                                                style={{marginTop: 10}}
                                                onPress = {()=> { 
                                                   continueWork(data._id, "clear")
                                                               } } 
                                             >
                                                <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: '#006400', marginHorizontal: 10}}>
                                                   <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Vẫn đặt</Text>
                                                </View>
                                             </TouchableOpacity>

                                             <TouchableOpacity
                                                style={{marginTop: 10}}
                                                onPress = {()=> { 
                                                   cancelWork(data._id, "clear")
                                                               } } 
                                             >
                                                <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                   <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hủy dịch vụ</Text>
                                                </View>
                                             </TouchableOpacity>
                                          </View>
                                          )
                                       :
                                          <View></View>
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
                        work.works.washingList.map(dt =>(
                           dt.map(data =>(
                              <List.Accordion
                              style={{backgroundColor: '#8FBC8B', marginBottom: 10}}
                                 key={Math.random()}
                                 title={Moment(data.dateSend).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: '#F0F8FF', paddingVertical: 10}} >
                                    
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Ngày nhận</Text>
                                       <Text key={Math.random()} style={{flex:1, textAlign: "right", fontWeight: 'bold'}}>{Moment(data.dateSend).format('dddd  DD/MM/YYYY')}</Text>
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
                                       <Text style={{fontSize: 16}}>Thời gian trả</Text>
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
                                                
                                             <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                                <View>
                                                   {data.staff.map(dt =>
                                                      <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                         <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
                                                      </View>
                                                   )
                                                   }
                                                </View>
                                                {/* <View>
                                                   {
                                                      data.idStaff.map(dt1=>
                                                         <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                         <View style={{flexDirection:'row'}}>
                                                            <TouchableOpacity onPress={()=>navigation.navigate('MessagesCustomer')}>
                                                               <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} /> 
                                                            </TouchableOpacity>
                                                            {
                                                               (data.status !== "Đã xác nhận")?
                                                               <TouchableOpacity onPress={()=> setModalVisible({visible: true, idStaff: dt1, idWork: data._id})}>
                                                                  <MaterialIcons name="report" size={24} color="red"  style={{marginLeft: 10}} /> 
                                                               </TouchableOpacity>
                                                               :
                                                           2    <View></View>
                                                            }
                                                         </View>
                                                      </View>
                                                      )
                                                   }   
                                                </View> */}
                                                <View>
                                                   {
                                                      data.idStaff.map(dt1=>
                                                         <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                         <View style={{flexDirection:'row'}}>
                                                            <TouchableOpacity onPress={()=>navigation.navigate('MessagesCustomer')}>
                                                               {/* <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} />  */}
                                                            </TouchableOpacity>
                                                            {
                                                               (data.status !== "Đã xác nhận")?
                                                               <TouchableOpacity onPress={()=> setModalVisible({visible: true, idStaff: dt1, idWork: data._id})}>
                                                                  {/* <MaterialIcons name="report" size={24} color="red"  style={{marginLeft: 10}} />  */}
                                                                  <MaterialIcons name="star-rate" size={24} color="#FF8C00" />
                                                               </TouchableOpacity>
                                                               :
                                                               <View></View>
                                                            }
                                                         </View>
                                                      </View>
                                                      )
                                                      
                                                   }   
                                                </View>
                                             </View>
                                                
                                             </View>
                                          </View> 
                                          <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                             <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                             <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen',{idWork: data._id, type: "washing", staff: data.idStaff}) }>
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
                                          (<TouchableOpacity onPress = {()=> {confirmWork(data._id,"washing")
                                             // setModalVisibleFB({visible: true,idWork: data._id, nameUser: user.users.data.fullname, idUser: user.users.data._id})
                                             checkFeebback('a', user.users.data._id,data._id, user.users.data.fullname, "washing")
                                          }} >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hoàn thành</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :
                                          (data.status === 'Đang chờ xác nhận')?
                                          (<TouchableOpacity 
                                             onPress = {()=> { 
                                                cancelWork(data._id, "washing")
                                                      }} 
                                          >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hủy dịch vụ</Text>
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
                              style={{backgroundColor: '#8FBC8B', marginBottom: 10}}
                                 key={Math.random()}
                                 title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: '#F0F8FF', paddingVertical: 10}} >
                                    
                                    <View style={styles.rowdetail} key={Math.random()}>
                                       <Text style={{fontSize: 16}}>Món ăn</Text>
                                       <View style={{ flex:1}}>
                                          {
                                             data.dishList.map(dt=>
                                                <Text key={Math.random()} style={{ textAlign: "right", fontWeight: 'bold'}}>{dt}</Text>          
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
                                    {
                                       data.reqStaff?
                                          <View style={styles.rowdetail} key={Math.random()}>
                                             <Text style={{fontSize: 16}}>Yêu cầu nhân viên</Text>
                                             <Text key={Math.random()} style={{flex:1,textAlign: "right", fontWeight: 'bold'}}> {data.reqStaff.fullnameStaff} </Text>
                                          </View>
                                       :
                                       <View></View>
                                    }
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
                                             <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                                <View>
                                                   {data.staff.map(dt =>
                                                      <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                         <Text key={Math.random()} style={{fontWeight: 'bold', textAlign: 'right'}}>{dt}</Text> 
                                                      </View>
                                                   )
                                                   }
                                                </View>
                                                <View>
                                                   {
                                                      data.idStaff.map(dt1=>
                                                         <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 2}}> 
                                                         <View style={{flexDirection:'row'}}>
                                                            <TouchableOpacity onPress={()=>navigation.navigate('MessagesCustomer')}>
                                                               {/* <Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color='#1E90FF' style={{marginLeft: 10}} />  */}
                                                            </TouchableOpacity>
                                                            {
                                                               (data.status !== "Đã xác nhận")?
                                                               <TouchableOpacity onPress={()=> setModalVisible({visible: true, idStaff: dt1, idWork: data._id})}>
                                                                  {/* <MaterialIcons name="report" size={24} color="red"  style={{marginLeft: 10}} />  */}
                                                                  <MaterialIcons name="star-rate" size={24} color="#FF8C00" />
                                                               </TouchableOpacity>
                                                               :
                                                               <View></View>
                                                            }
                                                         </View>
                                                      </View>
                                                      )
                                                      
                                                   }   
                                                </View>
                                             </View>
                                          </View>
                                       </View> 
                                       <View style={[{ flexDirection: 'row'},styles.rowdetail]} key={Math.random()}>
                                          <Text style={{flex:1, color: '#1E90FF', fontWeight: 'bold'}}>Kiểm tra thông tin</Text>
                                          <TouchableOpacity onPress={()=> navigation.navigate('ScanQRScreen',{idWork: data._id, type: "cooking", staff: data.idStaff}) }>
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
                                          (<TouchableOpacity onPress = {()=> {confirmWork(data._id,"cooking"),
                                             // setModalVisibleFB({visible: true,idWork: data._id, nameUser: user.users.data.fullname, idUser: user.users.data._id})
                                                checkFeebback('a', user.users.data._id,data._id, user.users.data.fullname, "cooking")
                                          }}  
                                          >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hoàn thành</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :
                                       //    (data.status === 'Đang chờ xác nhận')?
                                       //    (<TouchableOpacity 
                                       //       onPress = {()=> { 
                                       //          cancelWork(data._id, "cooking")
                                       //                      } } 
                                       //    >
                                       //       <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                       //          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hủy dịch vụ</Text>
                                       //       </View>
                                       //    </TouchableOpacity>)
                                       // :
                                       // (
                                       //    <View></View>
                                       // )
                                       (data.status === 'Đang chờ xác nhận' || data.status === "Tiếp tục đặt")?
                                          (<TouchableOpacity 
                                             onPress = {()=> { 
                                                cancelWork(data._id, "cooking")
                                                            } } 
                                          >
                                             <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hủy dịch vụ</Text>
                                             </View>
                                          </TouchableOpacity>)
                                       :(data.status === 'Đang chờ phản hồi')?
                                          (<View>
                                             <TouchableOpacity 
                                                style={{marginTop: 10}}
                                                onPress = {()=> { 
                                                   continueWork(data._id, "cooking")
                                                               } } 
                                             >
                                                <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: '#006400', marginHorizontal: 10}}>
                                                   <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Vẫn đặt</Text>
                                                </View>
                                             </TouchableOpacity>

                                             <TouchableOpacity
                                                style={{marginTop: 10}}
                                                onPress = {()=> { 
                                                   cancelWork(data._id, "cooking")
                                                               } } 
                                             >
                                                <View style={{height: 45, borderWidth: 0, justifyContent: 'center', backgroundColor: 'red', marginHorizontal: 10}}>
                                                   <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Hủy dịch vụ</Text>
                                                </View>
                                             </TouchableOpacity>
                                          </View>
                                          )
                                       :
                                          <View></View>
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
         <View>
            <ModalReportStaff
            handChangemodalVisible={()=>handChangemodalVisible()}
            
            isModalVisible={modalVisible.visible} idWork={modalVisible.idWork} idStaff={modalVisible.idStaff} setModalVisible={setModalVisible}/>
            <ModalFeedback
            handChangemodalVisibleFB={()=>handChangemodalVisibleFB()}
            idUser={modalVisibleFB.idUser}
            isModalVisibleFB={modalVisibleFB.visible} nameUser={modalVisibleFB.nameUser} idWork={modalVisibleFB.idWork} setModalVisibleFB={setModalVisibleFB}/>
         </View>
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