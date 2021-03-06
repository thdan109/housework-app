import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image, TextInput,ScrollView,FlatList, StyleSheet, Switch, Modal, Pressable, Alert} from 'react-native'
import {Ionicons , FontAwesome, Icon} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButton from '../../components/RadioButton';
import { LinearGradient } from 'expo-linear-gradient';
import AddressSelected from '../../components/AddressSelected';
import axios from 'axios';
import {useSelector} from 'react-redux'
import {Rating} from 'react-native-elements'

import SelectedAD from 'react-native-dropdown-picker';
import { ModalDatePicker } from "react-native-material-date-picker";
import Moment from 'moment';
import host from '../../host'

const {width, height } = Dimensions.get('screen')

const CookingScreen = ({ navigation } )=>{
   
   const user = useSelector(state=>state)
   const [selectedOption, setSelectedOption] = React.useState({
      key: 'performance',
      text: '2',
    }); 
   const [selectedFruit, setSelectedFruit] = React.useState({
      key: '1',
      text: 'Có'
   });
   const [selectedGo, setSelectedGo] = React.useState( {
      "key": "1",
      "text": "Có",
    });
   const [isEnabled, setIsEnabled] = React.useState(false);
   const [modalVisible, setModalVisible] = React.useState(true);
   const [modalVisible1, setModalVisible1] = React.useState(false);
   const [modalVisible2, setModalVisible2] = React.useState(false);
   const [ switchh , setSwitch] = React.useState(false)
   const [ money , setMoney ] = React.useState(Number(selectedOption.text) * 50000 + Number(selectedFruit.key) * 50000 + Number(selectedGo.key) * 75000)
   
   const [ listStaff, setListStaff ] = React.useState()
   const [dataVoucher, setDataVoucher] = React.useState()
   const [codeVoucher, setCodeVoucher] = React.useState()
   const [dataVoucherSend, setDataVoucherSend] = React.useState()
   const [dataStaffCooking, setDataStaffCooking] = React.useState([{
      id: null,
      name: null
   }])

   // setState data
   
   const [ numaddress, setNumaddress ] =  React.useState({})
   const [datee, setdate] = React.useState(new Date())
   const [datatime, setDataTime] =  React.useState({
      hour: 'null',
      min: 'null'
   })
   const [numCustomer, setNumCustomer] = React.useState('1')
   const [ dish, setDish] = React.useState()
   const [km, setKM] = React.useState(0)
   const [ dish1, setDish1] = React.useState()
   const [ dish2, setDish2] = React.useState()
   const [ dish3, setDish3] = React.useState()
   const [ dish4, setDish4] = React.useState()
   
   const hours = [
      // {label: '1', value: 'itemHours1'},
      // {label: '2', value: 'itemHours2'},
      // {label: '3', value: 'itemHours3'},
      // {label: '4', value: 'itemHours4'},
      // {label: '5', value: 'itemHours5'},
      {label: '6', value: 'itemHours6'},
      {label: '7', value: 'itemHours7'},
      {label: '8', value: 'itemHours8'},
      {label: '9', value: 'itemHours9'},
      {label: '10', value: 'itemHours10'},
      {label: '11', value: 'itemHours11'},
      {label: '12', value: 'itemHours12'},
      {label: '13', value: 'itemHours13'},
      {label: '14', value: 'itemHours14'},
      {label: '15', value: 'itemHours15'},
      {label: '16', value: 'itemHours16'},
      {label: '17', value: 'itemHours17'},
      {label: '18', value: 'itemHours18'},
   ]
   
   const mins = [
      {label: '00', value: 'itemMin1'},
      {label: '05', value: 'itemMin2'},
      {label: '10', value: 'itemMin3'},
      {label: '15', value: 'itemMin4'},
      {label: '20', value: 'itemMin5'},
      {label: '25', value: 'itemMin6'},
      {label: '30', value: 'itemMin7'},
      {label: '35', value: 'itemMin8'},
      {label: '40', value: 'itemMin9'},
      {label: '45', value: 'itemMin10'},
      {label: '50', value: 'itemMin11'},
      {label: '55', value: 'itemMin12'},
   ]
  

   

   const quantum = [
      {
        key: 'performance',
        text: '2',
      },
      {
        key: 'aToZ',
        text: '3',
      },
      {
        key: 'zToA',
        text: '4',
      },
    ];

   const fruits = [
      {
         key: '1',
         text: 'Có'
      },
      {
         key: '0',
         text: 'Không'
      }
   ]

   const go = [
      {
         key: '1',
         text: 'Có'
      },
      {
         key: '0', 
         text: 'Không'
      }
   ]

   React.useEffect(() =>{
      getAddressAPI()
      // console.log(hours);
      getDataService()
      getVoucherById()
      getDataStaff()
   },[])

   const [dataForApp , setDataForApp ] = React.useState()
   const getDataService = async() =>{

      const dataService = await axios.get(`${host}/cooking/getDataForApp`)

      if (dataService.data.data){
         setDataForApp(dataService.data.data)
      }else{
         console.log('err');
      }

   }


   //Function button Radio
   const onSelect = (item) => {
      if (selectedOption && selectedOption.key === item.key) {
        setSelectedOption(null);
      } else {
        setSelectedOption(item);
        setDish1(null)
        setDish2(null)
        setDish3(null)
        setDish4(null)
      }
   };
    
   const onSelectfruit = (item) => {
      if (selectedOption && selectedOption.key === item.key) {
        setSelectedFruit(null);
      } else {
        setSelectedFruit(item);
      }
   };
   
   const onSelectGo = (item) =>{
      if (selectedOption && selectedOption.key === item.key){
         setSelectedGo(null)
         
      }else{
         setSelectedGo(item)
      }
   }

   // Address
   const [ province, setProvince] = React.useState([])
   const [ district, setDistrict] = React.useState([])
   const [ ward, setWard ] = React.useState([])
   const [ dataSel, setDataSel ] = React.useState({
      provincestate: null,
      districtstate: null,
      ward: null
   })
   const [address, setAddress] = React.useState({
      address: null,
      totaladdress: null  
    })


   const getAddressAPI = async() =>{
      const getData =  await axios.get('https://www.thegioididong.com/cart/api/location/GetAllProvinces')
      let datamap = getData.data.data
      datamap = datamap.map(dt =>{
         return {
            'id': dt.provinceID,
            'value': dt.provinceName,
            'label': dt.provinceName
         }
      })
      datamap.pop()
      setProvince(datamap)
   }
   
   const changeCity = async(item) =>{
      const provinceNow = province.filter(data => { return data.value == item.value   })
      // console.log(provinceNow.length);
      // console.log(provinceNow[0].id);
      if (provinceNow.length){
         const changeCT = await axios.get('https://www.thegioididong.com/cart/api/location/GetDistrictsByProvinceId/'+provinceNow[0].id)
         let dataCity = changeCT.data.data.map(dt =>{
            return {
               'id': dt.districtID,
               'label': dt.districtName,
               'value': dt.districtName
            }
         }) 
         setDistrict(dataCity)
         setDataSel({
            ...dataSel,
            provincestate: item.value
         })
         // setDistrict(changeCT.data.data)
      }
      // console.log(dataCity);
      
   }
   
   const changeDistrict = async (item) =>{
      const districtNow = district.filter(data => {return data.value == item.value })
      // console.log(district[0].id);
      // console.log(district);
      if (districtNow.length){
         const changeDT = await axios.get('https://www.thegioididong.com/cart/api/location/GetWardsByDistrictId/'+districtNow[0].id)
         let dataDT  =  changeDT.data.data.map(dt =>{
            return{
               'id': dt.wardID,
               'label': dt.wardName,
               'value': dt.wardName
            }
         })
         setWard(dataDT)
         setDataSel({
            ...dataSel,
            districtstate: item.value
         })
      }  

     
   }

   const changeAddress = async() =>{
      if ( (dataSel.ward === null) || (dataSel.districtstate === null) || (dataSel.provincestate === null) ){
         setAddress({
            ...address,
            address: "Bạn chưa chọn địa chỉ"
         })
      }else{
         const addressdata = dataSel.ward+', '+dataSel.districtstate+', '+dataSel.provincestate
         setAddress({
            ...address,
            address: addressdata
         })
         // console.log(address);
      }
   }
 
   // End Address

   const getDataStaff = async() =>{

      const dataStaffCooking=  await axios.post(`${host}/staff/dataStaffCooking`)
      setDataStaffCooking(dataStaffCooking.data)

   }

   const reqStaff = async(val_Id, nameStaff) =>{
      setListStaff({
         id: val_Id,
         name: nameStaff
      })   
   }

   const getVoucherById = async ()=>{
      const idUser = user.users.data._id
      const data = await axios.post(`${host}/voucher/getVoucherByIdCooking`,{
         idUser: idUser
      })
      setDataVoucher(data.data)
   }

   const checkVoucher = async( ) =>{
    
      // console.log(dataVoucher);

      const dataVoucherProcessed = await dataVoucher.filter(dt => dt.codeVoucher === codeVoucher)

      // console.log(dataVoucherProcessed);

      if (dataVoucherProcessed.length !==0 ){
         return  Alert.alert(
            "Thông báo",
            "Bạn muốn dùng mã giảm giá này?",
            [
               {   
                  text: "OK", 
                  onPress: () => {
                     setKM(dataVoucherProcessed.map(dt => {return dt.prince}))
                     setDataVoucherSend(dataVoucherProcessed)
                  }
               },
               {
                  text: "Cancel",
                  onPress: () =>{
                        setKM(0)
                        setDataVoucherSend(null)
                     },
                  style: "cancel"
               }
               
            ]
          );
         
      }else if (dataVoucherProcessed.length === 0){
         return  Alert.alert(
            "Thông báo",
            "Mã khuyến mãi không có!",
            [
               {   
                  text: "OK", 
                  onPress: () => {
                     setKM(0)
                     setDataVoucherSend(null)
                  }
               }
            ]
          );
      }
   }


   
   const total = async() =>{
      console.log("aaaaa"+km);
      if ((address.address != 'Bạn chưa chọn địa chỉ') && (numaddress != null) && (dish != null) && (datatime.hour.label) && (datatime.min.label) && (numCustomer != 'null')){
         let money = (Number(selectedFruit.key)*dataForApp[3] + Number(selectedGo.key)*dataForApp[0] + Number(selectedOption.text)*dataForApp[1] + Number(numCustomer)*dataForApp[2]) - Number(km)
         setMoney(money)
         setModalVisible1(true)
      }else{
         
         return Alert.alert('Nhập đầy đủ thông tin')
         // setModalVisible1(false)
      }
   }

   const onSubmit = async() =>{
      const token_val = await AsyncStorage.getItem('Token')

      const sendAddress = numaddress+', '+ address.address;
      const sendTime = datatime.hour.label+':'+datatime.min.label;
      // console.log(dish);
      console.log(listStaff);      
         const createCooking = await axios.get(`${host}/cooking/create`, {
            headers: {
               Authorization: `Bearer ${token_val}`,
            },
            params: {
               dtaddress: sendAddress,
               dtdish: dish,
               dtfruit: selectedFruit.text,
               dtMarket: selectedGo.text,
               dtTime: sendTime,
               dtdate: datee,
               dtnumCus: numCustomer,
               dtMoney: money, 
               km: km,
               voucher: dataVoucherSend,
               staff: listStaff.id
            }

         })
         if ( createCooking.data.status === 'Oke' ){
            navigation.replace('Home')
         }else{
            return Alert.alert('Chưa thêm được viêc. Có lỗi, vui lòng thử lại!')
         }
     
   }

   // const onNext = async() =>{
      
   // }

   const toggleSwitch = () =>{ 
      setIsEnabled(previousState => !previousState)
      setSwitch(!switchh)
   };

   return(
         <View style={{
            flex: 1, 
            backgroundColor: 'rgba(250,250,250,0.3)',
         }}>
            <View style={{
               backgroundColor: '#043927',
               height: 120
            }}>
               <View style={{
                  backgroundColor: '#043927',
                  height: 40,
                  flexDirection: 'row',
                  marginTop: 30,
                  // borderColor: 'white',
                  // borderWidth: 1
               }}>
                  <TouchableOpacity onPress={() =>navigation.navigate('Home')} >
                     <Ionicons name="arrow-back-sharp" size={24} color="white"  style={{marginLeft: 15}} />
                  </TouchableOpacity>
                  
                  <Text style={{
                     color: 'white',
                     fontSize: 20,
                     marginLeft: 15,
                  }}>Nấu ăn</Text>
               </View>
            </View>
            
            <View style={{
                  height: height-170,
                  marginTop: -40,
            }}>
               <ScrollView style={{
                  backgroundColor: 'white',
                  marginHorizontal: 10,
                  borderRadius: 10,
                  // borderWidth: 1,

                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
               >

                  <View style={{
                     marginTop: 10,
                     marginHorizontal: 20
                  }}>           
{/* Modal */}

                  <Modal
                     animationType="slide"
                     transparent={true}
                     visible={modalVisible2}
                     onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible2(!modalVisible2);
                     }}
                  >
                     <View style={{
                        height: '100%',
                        width: '100%',
                        justifyContent:'center',
                        backgroundColor: 'rgba(10,10,10,0.85)',
                        paddingHorizontal: 10,
                     }} >
                        <View style={{
                           backgroundColor:'white',
                           flex: 4.5/5,
                           borderRadius: 10
                        }}> 
                           
                           <TouchableOpacity style={{alignItems: 'flex-end', marginRight: 5}} onPress={()=>{setModalVisible2(!modalVisible2)}}>
                              <Ionicons  name='close-circle' size={26} color={'red'} style={{ marginTop: 10}} />
                           </TouchableOpacity>
                           <View>
                              <Text
                                 style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    textAlign: 'center'
                                 }}
                              >DANH SÁCH NHÂN VIÊN</Text>
                           </View>
                           <View 
                              style={{
                                 // borderWidth: 1, 
                                 marginVertical: 10, 
                                 marginHorizontal: 10,
                           }}>
                              {/* <ScrollView
                                 showsVerticalScrollIndicator={false}cd 
                                 showsHorizontalScrollIndicator={false}
                              > */}
                                    {/* <Text onPress ={() =>console.log(dataStaffClear)}>aaaaaaaaaaaa</Text>                            */}
                                    <FlatList
                                       showsVerticalScrollIndicator={false}
                                       showsHorizontalScrollIndicator={false}
                                       style={styles.Flatlist}
                                       data={dataStaffCooking}
                                       keyExtractor={item => item._id}
                                       renderItem={({item,index}) =>(
                                          <Pressable  onPress={()=> {reqStaff(item._id, item.fullnameStaff)} }   >
                                                <View 
                                                   style={styles.renderFlatlist} 
                                                >
                                                   <View style={{flexDirection: 'row'}}>
                                                      <View style={{backgroundColor: "#043927",  width: 80, height: 80, borderWidth: 0, borderRadius: 40,marginLeft: 5}}>
                                                         <Image source={{uri:`${host}/${item.avatarStaff}` }} style={{ flex: 1,  borderRadius: 80}} />
                                                      </View>
                                                      <View style={{marginLeft: 20}}>
                                                         <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}  >{item.fullnameStaff}</Text>
                                                         <View style={{flexDirection :'row'}}>
                                                            <Rating readonly={true}  fractions={1} startingValue={(item.rating)}   tintColor="#37474f" imageSize={20} />
                                                            <Text style={{fontWeight: 'bold', color:'white'}}>  {Number(item.rating).toFixed(1)}/5</Text>
                                                         </View>
                                                      </View>
                                                      
                                                   </View>

                                                </View>
                                          </Pressable> 
                                       )}
                                    />
                                    {/* <Text onPress={()=>console.log(listStaff)}>aaaaaaaaaaaaa</Text> */}
                                    <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, borderWidth: 1, borderColor: 'green' }}>
                                       <Text style={{color: 'gray'}}>BẠN ĐÃ CHỌN</Text>
                                       <Text style={{flex:1, textAlign: 'right', fontWeight: 'bold'}}>{listStaff?.name} </Text>
                                    </View>
                                    <TouchableOpacity 
                                       onPress={() => { 
                                          setModalVisible2(!modalVisible2)
                                       }} 
                                       style={{marginTop: 20}} 
                                    >
                                       <LinearGradient
                                          colors={['#0ba360', '#3cba92']}
                                          style={{ 
                                             height: 50, justifyContent: 'center', 
                                             alignContent:  'center',
                                             alignItems: 'center',
                                             height: 50, 
                                             justifyContent: "center", 
                                             alignItems: 'center', 
                                             marginBottom: 20    
                                          }}
                                       >
                                             <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Xác nhận</Text>
                                       </LinearGradient>
                                    </TouchableOpacity>
                              {/* </ScrollView> */}
                           </View>



                        </View>

                     </View>
                  </Modal>

                  <Modal
                     animationType="slide"
                     transparent={true}
                     visible={modalVisible}
                     onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                     }}
                     >
                        <View style={{
                           height: '100%',
                           // borderWidth: 1,
                           backgroundColor: 'rgba(0,0,0,0.6)',
                           justifyContent: 'center' 
                        }}>   
                           <View style={{
                              // borderWidth: 1,
                              height: 380,
                              backgroundColor: 'white',
                              marginHorizontal: 10,
                              borderRadius: 10,
                              paddingHorizontal: 10,
                              
                           }}>
                              <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible), setAddress({address: 'Bạn chưa chọn địa chỉ'})}}>
                                 <Ionicons  name='close-circle' size={26} color={'red'} style={{ marginTop: 10}} />
                              </TouchableOpacity>
                              
                              <Text style={{marginTop: 0,marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Địa chỉ</Text>
                  {/* Modal dia chi */}
                              <SelectedAD 
                                 placeholder={'Chọn thành phố/tỉnh'}
                                 containerStyle={{height: 50, marginTop: 10}}
                                 // onValueChange={(val)=>changCity(val)}
                                 items={province}
                                 onChangeItem={(item) => changeCity(item) }
                              />
                              <SelectedAD
                                 placeholder={'Chọn huyện/quận'}
                                 containerStyle={{height: 50, marginTop: 10}}
                                 onChangeItem={(item)=> changeDistrict(item) }
                                 items={district}
                                 value={dataSel.districtstate}
                              />
                              <SelectedAD
                                 placeholder={'Chọn Xã/Phường'}
                                 onChangeItem={(item)=>setDataSel({
                                                ...dataSel,
                                                ward: item.value
                                             })}
                                 containerStyle={{height: 50, marginTop: 10}}
                                 items={ward}
                                 value={dataSel.wardstate}
                              />
                  {/* End dia chia */}
                              <TouchableOpacity 
                                 onPress={() => {setModalVisible(!modalVisible), changeAddress()}} 
                                 style={{marginTop: 20}} 
                              >
                                 <LinearGradient
                                    colors={['#0ba360', '#3cba92']}
                                    style={{ 
                                       height: 50, justifyContent: 'center', 
                                       alignContent:  'center',
                                       alignItems: 'center',
                                       height: 50, 
                                       borderWidth: 1, 
                                       justifyContent: "center", 
                                       alignItems: 'center', 
                                       marginBottom: 20    
                                    }}
                                 >
                                       <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Chọn địa chỉ này</Text>
                                 </LinearGradient>
                              </TouchableOpacity>
                           </View>
                           
                        </View>
                  </Modal>
                  {/* <Pressable
                     style={[styles.button, styles.buttonOpen]}
                     onPress={() => setModalVisible(true)}
                     >
                     <Text style={styles.textStyle}>Show Modal</Text>
                  </Pressable> */}
                  <Modal
                     animationType="slide"
                     transparent={true}
                     visible={modalVisible1}
                     onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible1(!modalVisible1);
                     }}
                     >
                        <View style={{
                           height: '100%',
                           // borderWidth: 1,
                           backgroundColor: 'rgba(0,0,0,0.6)',
                           justifyContent: 'center' 
                        }}>   
                           <View style={{
                              // borderWidth: 1,
                              height: 420,
                              backgroundColor: 'white',
                              marginHorizontal: 10,
                              borderRadius: 10,
                              paddingHorizontal: 10,
                              
                           }}>
                              <TouchableOpacity onPress={()=>{setModalVisible1(!modalVisible1)}}>
                                 <Ionicons  name='close-circle' size={26} color={'red'} style={{ marginTop: 10}} />
                              </TouchableOpacity>
                              
                              <Text style={{marginTop: 0,marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Nấu ăn</Text>
                  {/* Modal dia chi */}
                              <View>
                                 <ScrollView>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{ marginRight: 10}}>Địa chỉ: </Text>
                                       <Text style={{ flex:1, textAlign: 'right' }} >{numaddress +','+address.address}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Số người ăn:  </Text>
                                       <Text>{numCustomer}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Số món:  </Text>
                                       <Text>{selectedOption.text}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Ngày:   </Text>
                                       <Text>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Thời gian:  </Text>
                                       <Text>{datatime.hour.label +' giờ '+ datatime.min.label+' phút'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Trái cây:  </Text>
                                       <Text>{selectedFruit.text}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Đi chợ:  </Text>
                                       <Text>{selectedGo.text}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                       <Text style={{flex:1}}>Tổng tiền:  </Text>
                                       <Text>{money} VNĐ</Text>
                                    </View>
                                 </ScrollView>
                              </View>
                  {/* End dia chia */}
                              <TouchableOpacity 
                                 onPress={() => {onSubmit(),setModalVisible1(!modalVisible1)}} 
                                 style={{marginTop: 20}} 
                              >
                                 <LinearGradient
                                    colors={['#0ba360', '#3cba92']}
                                    style={{ 
                                       height: 50, justifyContent: 'center', 
                                       alignContent:  'center',
                                       alignItems: 'center',
                                       height: 50, 
                                       borderWidth: 1, 
                                       justifyContent: "center", 
                                       alignItems: 'center', 
                                       marginBottom: 20    
                                    }}
                                 >
                                       <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Xác nhận</Text>
                                 </LinearGradient>
                              </TouchableOpacity>
                           </View>
                           
                        </View>
                  </Modal>
{/* End Modal */}
                     <Text style={{ 
                        color: 'gray',
                        marginBottom: 3,
                        fontSize: 11
                     }}>
                        NƠI LÀM VIỆC
                     </Text>
                     <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                     }}>
                        <Text
                           onPress={()=> setModalVisible(true)}
                           style={{
                              height: 45,
                              borderWidth: 1,
                              borderColor: '#228B22',
                              borderRadius: 5,
                              paddingHorizontal: 10,
                              paddingVertical: 12
                           }} 
                        >{address.address}</Text>
                     </View>
                    
                  </View>

                  <View style={{
                     marginTop: 10,
                     marginHorizontal: 20
                  }}>
                     <Text style={{ 
                        color: 'gray',
                        marginBottom: 3,
                        fontSize: 11
                     }}>
                        SỐ NHÀ
                     </Text>
                     <TextInput
                        onChangeText={(val)=>{setNumaddress(val)}}
                        style={{
                           height: 45,
                           borderWidth: 1,
                           borderColor: '#228B22',
                           borderRadius: 5,
                           paddingHorizontal: 10
                        }} 
                        placeholder={'Nhập số nhà'}
                     ></TextInput>
                  </View>

                  <View style={{
                     marginTop: 10,
                     marginHorizontal: 20
                  }} >
                     <Text style={{ 
                        color: 'gray',
                        marginBottom: 3,
                        fontSize: 11
                     }}>
                        THÔNG TIN BỮA ĂN
                     </Text>  
                     <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        alignItems: 'center'
                     }}>
                        <Text style={{ 
                           marginRight: 50,
                           color: 'black',
                           fontSize: 13
                        }}>Số người ăn</Text>

                        <TextInput 
                           onChangeText={(val) => {setNumCustomer(val)}}
                           keyboardType='number-pad' 
                           style={{borderBottomWidth:0.8 ,width: 120, borderBottomColor: 'gray'}} 
                           placeholder={'Nhập số người ăn'}
                        >
                        </TextInput>
                     </View>
                     
                     <View style={{
                        marginTop: 10
                       
                     }}>
                        <View style={{
                           flexDirection: 'row',
                           alignItems: 'center'
                        }}>
                           <Text style={{ 
                               width: 115,
                              color: 'black',
                              fontSize: 13
                           }}>Số món ăn</Text>
                           <View>
                              <RadioButton
                                 selectedOption={selectedOption}
                                 onSelect={(item)=>{onSelect(item)}}
                                 options={quantum}
                              />
                           </View>
                        </View>
                        
                        {
                           selectedOption.text === '2' ? 
                           (
                              <View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 12 }} >Món 1</Text>
                                    <TextInput
                                       onChangeText={(val)=>{setDish(
                                          // val)}}
                                          {
                                          ...dish,
                                          dish1: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 12 }} >Món 2</Text>
                                    <TextInput
                                        onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish2:val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                              </View>
                           )
                           : selectedOption.text === '3' ?
                           (
                              <View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 1</Text>
                                    <TextInput
                                        onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish1: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 2</Text>
                                    <TextInput
                                        onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish2: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 3</Text>
                                    <TextInput
                                       onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish3: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                              </View>
                           )
                           : selectedOption.text === '4' &&
                           (
                              <View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 1</Text>
                                    <TextInput
                                        onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish1: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 2</Text>
                                    <TextInput
                                        onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish2: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>

                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 3</Text>
                                    <TextInput
                                        onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish3: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 4</Text>
                                    <TextInput
                                       onChangeText={(val)=>{setDish({
                                          ...dish,
                                          dish4: val
                                       })}}
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                              </View>
                           )
                        }
                     </View> 
                  </View>

                  <View style={{
                     flexDirection: 'row',
                     marginTop: 20
                  }}>
                     <View style={{
                        width: '40%',
                        marginTop: 10,
                        marginHorizontal: 20,
                        
                     }}>
                        <Text style={{ 
                           color: 'gray',
                           marginBottom: 3,
                           fontSize: 11
                        }}>
                           NGÀY ĂN
                        </Text>
                           <ModalDatePicker 
                              locale="en" 
                              onSelect={(date) => {setdate(date)} }
                              isHideOnSelect={true}
                              initialDate={new Date()}
                              button={<Text style={{fontSize: 17, borderWidth: 1, borderColor: '#228B22',borderRadius: 5,paddingHorizontal: 10, textAlign: 'center', color: 'black'}}>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>}
                           />  
                     </View>

                     <View style={{
                        width: '40%',  
                        marginTop: 10,
                        marginHorizontal: 20
                     }}>
                        <Text style={{ 
                           color: 'gray',
                           marginBottom: 3,
                           fontSize: 11
                        }}>
                           THỜI GIAN
                        </Text>
                        <SelectedAD
                           placeholder=''
                           items={
                              hours
                           }
                           onChangeItem={(item) => setDataTime({
                              ...datatime,
                              hour: item
                           }) }
                        />
                        <SelectedAD
                           placeholder=''
                           items={
                              mins
                           }
                           onChangeItem={(item) => setDataTime({
                              ...datatime,
                              min: item
                           }) }
                        />



                        {/* <TextInput
                           style={{
                              height: 45,
                              borderWidth: 1,
                              borderColor: '#228B22',
                              borderRadius: 5,
                              paddingHorizontal: 10
                           }} 
                           placeholder={'Địa chỉ đã chọn'}
                        ></TextInput> */}
                     </View>
                  </View>
     {/* ------------              */}
                  <View style={{
                     // marginTop: 10,
                     marginHorizontal: 20
                  }} >
                      <View style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: 'center'
                     }}>
                        <Text style={{ 
                           width: 115,
                           color: 'black',
                           fontSize: 13
                        }}>Trái cây</Text>
                        <View>
                           <RadioButton
                              selectedOption={selectedFruit}
                              onSelect={(item)=>{onSelectfruit(item)}}
                              options={fruits}
                           />
                        </View>
                     </View>     

                     <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                     }}>
                        <Text style={{ 
                           width: 115,
                           // marginRight: 70,
                           color: 'black',
                           fontSize: 13
                        }}>Đi chợ</Text>
                        <View>
                           <RadioButton
                              selectedOption={selectedGo}
                              onSelect={(item)=>{onSelectGo(item)}}
                              options={go}
                           />
                        </View>
                     </View>   
                  </View>  
      {/* ------------------       */}
                  <View >
                     <View style={{
                        marginTop: 20,
                        marginHorizontal: 20,
                        marginBottom: 20     
                     }}>
                        <Text style={{ 
                           color: 'gray',
                           marginBottom: 3,
                           fontSize: 11
                        }}>
                          MÃ GIẢM GIÁ
                        </Text>
                        <View style={{
                           flexDirection: 'row',
                           alignItems: 'center'
                        }}>
                           <TextInput
                              onChangeText={(val)=>setCodeVoucher(val)}
                              style={{
                                 flex: 1,
                                 height: 45,
                                 borderWidth: 1,
                                 borderColor: '#228B22',
                                 borderRadius: 5,
                                 paddingHorizontal: 10
                              }} 
                              placeholder={'Nhập mã giảm giá (nếu có)'}
                           ></TextInput>
                           <TouchableOpacity  onPress={() => checkVoucher()}>
                              <Text style={{ marginLeft: 20, color: 'red', fontSize: 18, fontWeight: 'bold'}} >Áp dụng</Text>
                           </TouchableOpacity>
                           
                        </View>

                        <View style={{
                           marginTop: 30,
                           flexDirection: 'row',
                           padding: 10,
                           height: 60,
                           justifyContent:'center',
                        }}>
                           <TouchableOpacity  
                              style={{justifyContent: 'center'}}
                              onPress={async()=> {
                                  Alert.alert(
                                    "Thông báo!",
                                    "Bạn có thể chọn nhân viên muốn yêu cầu. Chúng tôi sẽ xem xét yêu cầu của bạn!",
                                    // "Có thể phát sinh thêm phí"
                                    [
                                       {   
                                          text: "OK", 
                                          onPress: () => {
                                             setModalVisible2(true)
                                          }
                                       },
                                       {   
                                          text: "Cancel", 
                                       },
                                    ]
                                    
                                 )
                                 //  setModalVisible2(true)
                                 // console.log(modalVisible2);
                           }} >
                              <Text
                                 style={{ 
                                    fontWeight: 'bold',
                                    color: 'green',
                                    marginBottom: 3,
                                    fontSize: 14,
                                 }}>YÊU CẦU NHÂN VIÊN</Text>
                           </TouchableOpacity>
                           <Text style={{
                              flex:1,
                              marginLeft: 20,
                              borderWidth: 0.8,
                              borderColor: '#228B22', 
                              padding: 10,
                              textAlign: 'right',
                              borderRadius: 5
                              
                           }}>
                              {listStaff?.name}
                           </Text>


                        </View>

                     </View>
                  </View>
               </ScrollView>

               <TouchableOpacity onPress={()=>{total()}}>
                  <View style={{
                     position: 'relative',
                     marginHorizontal: 25,
                     borderRadius: 10,
                     height: 50,
                     marginTop: 10,
                     // marginBottom: 10, 
                     backgroundColor: 'rgb(46, 139, 87)',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}>
                     <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold'}}>Tiếp tục</Text>
                  </View>
               </TouchableOpacity>
            </View>

            
         </View>
   )
}

export default CookingScreen;

const styles = StyleSheet.create({
   centeredView: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     marginTop: 22
   },
   modalView: {
     margin: 20,
     backgroundColor: "white",
     borderRadius: 20,
     padding: 35,
     alignItems: "center",
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5
   },
   button: {
     borderRadius: 20,
     padding: 10,
     elevation: 2
   },
   buttonOpen: {
     backgroundColor: "#F194FF",
   },
   buttonClose: {
     backgroundColor: "#2196F3",
   },
   textStyle: {
     color: "white",
     fontWeight: "bold",
     textAlign: "center"
   },
   modalText: {
     marginBottom: 15,
     textAlign: "center"
   },
   Flatlist:{
      marginBottom: 10,
      height: '69%'
   },
   renderFlatlist:{
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      backgroundColor: '#37474f'
   }
 });
