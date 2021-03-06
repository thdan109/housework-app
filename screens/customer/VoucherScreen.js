import React from 'react'
import { View, Text, Dimensions, StyleSheet, StatusBar, FlatList, TouchableOpacity, RefreshControl, Image, Modal, Alert} from 'react-native'
import NumberFormat from 'react-number-format';
import {Ionicons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import host from '../../host'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Moment from 'moment'

const { height, width} = Dimensions.get('screen')

const wait = (timeout) => {
   return new Promise(resolve => setTimeout(resolve, timeout));
}

const DATA = [
   {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      name: 'Mr.One'
   },
   {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      name: 'Mr.Two'
   },
   {
      id: '58694a0f-3da1-471f-bd96-145571e29d76',
      title: 'Ngày',
      name: 'Việc làm 1'
   },
   {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',
      title: 'Ngày',
      name: 'Việc làm 2'
   },
   {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Ngày',
      name: 'Việc làm 3'
   },
   {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Ngày',
      name: 'Việc làm 4'
   },
   {
     id: '58694a0f-3da1-471f-bd96-145571e29d72',
     title: 'Ngày',
     name: 'Việc làm 5' 
   },
 ];

//  const Item = ({ title,name }) => (
//    <View style={styles.item}>
//      <Text style={styles.title}>{title}</Text>
//      <Text style={styles.name}>{name}</Text>
//    </View>
//  );






const VoucherScreen = ({navigation}) =>{

   const use = useSelector(state => state)

   const [data, setData] = React.useState()

   const [refreshing, setRefreshing] = React.useState(false);
   const [ modalVisible, setModalVisible] = React.useState(false)
   const [dataOne, setDataOne ] = React.useState()
   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() =>{ setRefreshing(false)
         getVoucher()
      });
    }, []);

   React.useEffect(()=>{
      getVoucher()
   },[])

   const  getVoucher = async( ) =>{
      const idUser = use.users.data._id 
      const data = await axios.post(`${host}/voucher/getVoucherById`,{
         idUser: idUser
      })
      setData(data.data)
   }

   const filterVoucher = async(val) =>{
      const dataOne = await axios.post(`${host}/voucher/showVoucherById`, {
         id:val
      })
      setDataOne(dataOne.data)
      
   }

   return (
     <View style={styles.container}>
         <StatusBar />
         <View style={styles.header} >
            <LinearGradient style={{flex:1}} colors={["#043927","#043927"]}>
               <View style={{flexDirection: 'row', paddingVertical: 5}} >
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                     <Ionicons name="chevron-back" size={27} color="white" style={{marginHorizontal: 10}} />
                  </TouchableOpacity>
                  <Text style={{flex: 1, marginBottom: 10,fontSize: 19,textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Khuyến mãi của bạn</Text>
                  <TouchableOpacity >
                     <Ionicons name="refresh-circle-outline" size={27} color="white" style={{marginHorizontal: 10, opacity: 0 }} />
                  </TouchableOpacity>
               </View>               
            </LinearGradient>
         </View>
         <View style={styles.showNotifi}>
          
            <View style={styles.containerFlatlist}>
               
               <FlatList 
                  refreshControl={
                     <RefreshControl
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                     />
                  }
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={styles.Flatlist}
                  data={data}
                  keyExtractor={item => item._id}
                  renderItem={({item,index}) =>(
                     <TouchableOpacity onPress = {() =>{setModalVisible(!modalVisible)
                        filterVoucher(item._id)
                     }}>
                        <View style={styles.renderFlatlist} >
                           <View style={{flexDirection: 'row'}}>
                              <View>
                                 <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>{item.nameVoucher}</Text>
                                 <Text style={{fontSize: 14, marginTop: 10,color: 'white'}}>Mã khuyến mãi: {item.codeVoucher}</Text>
                                 <Text style={{fontSize: 14, marginTop: 10, color: 'white'}}>Ưu đãi:  <NumberFormat key={Math.random()} value={item.prince} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                 </Text>
                              </View>
                              <View 
                              style={{
                                 marginHorizontal: 30,
                                 // borderWidth: 1, 
                                 // width: 117,
                                 // height: 91
                              }}
                              >
                                 <Image source={require('../../assets/Capture.png')} style={{width: 126,height: 72, borderRadius: 15}}  />
                              </View>
                           </View>
                           
                        </View>
                     </TouchableOpacity>
                    
                  )}
               />
            </View>



         </View>
         <View>
            <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
               }}

            >
               <View style={styles.contentModal}>
                  <View style={{ flex: 4/5, backgroundColor :'white', marginHorizontal: 20 }}>
                     <View style={styles.content}>
                        <View style={{backgroundColor: '#37474f'}}>
                           <View 
                              style={{
                                 marginHorizontal: 10,
                                 marginVertical: 20,
                                 justifyContent: 'center',
                                 // borderWidth: 1, 
                                 alignItems: 'center',
                                 // width: 117,
                                 // height: 91
                                 
                              }}
                              >
                                 <Image source={require('../../assets/Capture.png')} style={{width: 300,height: 200, borderRadius: 15}}  />
                           </View>
                        </View>
                       
                              {
                                 dataOne&&
                                    <View style={{borderWidth: 0, marginHorizontal: 10, marginTop: 10}}>
                                       <View style={{ marginTop: 0,marginBottom: 10}}>
                                          <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>Tên </Text>
                                          <Text >{dataOne.nameVoucher}</Text>
                                       </View>
                                       <View style={{ marginTop: 0, marginBottom: 10}}>
                                          <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>Ưu đãi </Text>
                                          {/* <Text >{dataOne.prince}
                                          
                                          </Text> */}
                                          <NumberFormat key={Math.random()} value={dataOne.prince} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                                       </View>
                                       <View style={{ marginTop: 0,marginBottom: 10}}>
                                          <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>CODE </Text>
                                          <Text>{dataOne.codeVoucher}</Text>
                                       </View>
                                       <View style={{ marginTop: 0,marginBottom: 10}}>
                                          <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>Mô tả</Text>
                                          <Text>{dataOne.description}</Text>
                                       </View>
                                       <View style={{ marginTop: 0,marginBottom: 10}}>
                                          <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>Điều kiện</Text>
                                          <Text>Mỗi khách hàng được sử dụng một lần. Cho đơn từ 0đ.</Text>
                                       </View>
                                    </View>
                              }
                        
                     </View>
                     <View style={styles.button} >
                           <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                              <View style={{marginHorizontal: 5, marginVertical: 10, height: 55, backgroundColor: '#37474f', borderRadius: 5, justifyContent: 'center'}}>
                                 <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>ĐỒNG Ý</Text>
                              </View>
                           </TouchableOpacity>

                     </View>

                  </View>
               </View>
            </Modal>
         </View>
     </View>




   )
}

export default VoucherScreen


const styles = StyleSheet.create({

   container: {
      flex:1
   }, 
   header:{
      height: 80,
   },
   headerr:{
      height: 30,
      backgroundColor: '#006400',
      flexDirection: 'row'
   },
   showNotifi:{
      flex:1,
      marginBottom: 10,
      marginTop: -30,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      backgroundColor: 'rgba(230,230,230,1)'
   },
   containerFlatlist:{
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 10,
      // backgroundColor: 'gray'
   },
   
   Flatlist:{
      // height: 91,
      // borderWidth: 1,
      
   },
   renderFlatlist:{
      // height: 91,
      borderWidth: 2,
      borderColor: 'yellow',
      marginBottom: 10,
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 20,
      // backgroundColor: '#FF4500'
      backgroundColor: '#37474f'

   },
   contentModal:{
      flex:1,
      backgroundColor: 'rgba(10,10,10,0.8)',
      justifyContent: 'center'
   },
   content:{
      // marginTop: 50,
      flex: 4.8/5,
      // borderWidth: 1
   },
   button:{
      
      // height: 10,
      // backgroundColor: 'green'
   }
   



})