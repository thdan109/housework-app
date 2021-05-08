import React from 'react';
import {View,Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
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

const HistoryScreen = ({ navigation,props }) =>{
   const [isLoad,setIsLoad] = React.useState(true)


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


   const getOrder = async() =>{
      
      const token_val = await AsyncStorage.getItem('Token')
      const dataOrder = await axios.get(`${host}/user/getOrderSave`,{
         headers: {
            Authorization: `Bearer ${token_val}`,
         }
      })

      if (dataOrder.data.orderClearSave){      
         setDataClear(dataOrder.data.orderClearSave)
         // dispatch(addWorkClear(dataOrder.data.orderClear))
      }
      if (dataOrder.data.orderCookingSave){
         setDataCooking(dataOrder.data.orderCookingSave)
         // dispatch(addWorkCooking(dataOrder.data.orderCooking))
   
      }
      if (dataOrder.data.orderWashingSave){
         setDataWashing(dataOrder.data.orderWashingSave)
         // dispatch(addWorkWashing(dataOrder.data.orderWashing))
      }
      
   }

   
   
   return(
      <View style={styles.container}>

         <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
               <Ionicons name="chevron-back" size={36} color="white" style={{marginHorizontal: 10}} />
            </TouchableOpacity>
            
            <Text style={{fontSize:20, color: 'white', fontWeight:'bold', textAlign: 'center'}}>Việc đã đặt</Text>
         </View>
         
         <View style={{ marginTop: -30 ,height: 600 }} >
         <ScrollView>
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
               // <View></View>
               (dataClear.length === 0 )?<View></View>:
               <View style={styles.containerWork}>
                  
                  <List.Section title="Dọn nhà"  >
                     {
                        dataClear.map(data =>(
                           // dt.map(data =>(
                              // <Text>aaaaaaaaa</Text>
                           <List.Accordion
                              style={{backgroundColor: '#8FBC8B', marginBottom: 10}}
                              key={Math.random()}
                              title={Moment(data.date).format('dddd  DD/MM/YYYY')}
                              left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                           >
                              <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                 
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
                              </View>  
                           </List.Accordion>
                           // ))
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
                           // dt.map(data =>(
                              <List.Accordion
                              style={{backgroundColor: '#BDB76B', marginBottom: 10}}
                                 key={Math.random()}
                                 title={Moment(data.dateSend).format('dddd  DD/MM/YYYY')}
                                 left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                              >
                                 <View key={Math.random()} style={{backgroundColor: 'rgba(0, 139, 139,0.3)', paddingVertical: 10}} >
                                    
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
                                 </View>

                              </List.Accordion>
                           ))
                        // ))
                     }
                     
                  </List.Section>
               </View>
               
            }

            {
               (dataCooking.length === 0)? <View></View>:
               <View style={styles.containerWork}>
                  <List.Section title="Nấu ăn"  >
                     {
                        dataCooking.map(data=>(
                           // dt.map(data =>(
                              <List.Accordion
                              style={{backgroundColor: '#D2B48C', marginBottom: 10}}
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
                                   
                                 </View>

                              </List.Accordion>
                           ))
                        // ))
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

export default HistoryScreen;
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