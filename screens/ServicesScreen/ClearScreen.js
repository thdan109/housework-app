import React from 'react'
import {View, Text, Dimensions, StyleSheet, ScrollView, Modal,TextInput, TouchableOpacity,Alert,FlatList,Image, Pressable, TouchableHighlight} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import host from '../../host'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import SelectedAD from 'react-native-dropdown-picker';
import { ModalDatePicker } from "react-native-material-date-picker";
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkCooking, addWorkWashing, addWorkClear } from '../../action/workAction';
import {Rating} from 'react-native-elements'
const {width, height} = Dimensions.get('screen')

const ClearScreen = ( { navigation}  ) =>{
   const user = useSelector(state => state)
   const dispatch = useDispatch()
   const work = useSelector(state => state)
   const [isLoad,setIsLoad] = React.useState(true)
// state
   const [modalVisible, setModalVisible] = React.useState(true);
   const [modalVisible1, setModalVisible1] = React.useState(false);
   const [ modalVisible2, setModalVisible2] = React.useState(false);
   const [dataForApp, setDataForApp] = React.useState()
   const [dataVoucher, setDataVoucher] = React.useState()
   const [codeVoucher, setCodeVoucher] = React.useState()
   const [dataVoucherSend, setDataVoucherSend] = React.useState()
   const [press, setPress] = React.useState(false)
   const [dataStaffClear, setDataStaffClear] = React.useState([{
      id: null,
      name: null
   }])

   const [ listStaff, setListStaff ] = React.useState()
   const [ datee, setdate] = React.useState()
   const [ province, setProvince] = React.useState([])
   const [ district, setDistrict] = React.useState([])
   const [ ward, setWard ] = React.useState([])
   const [ dataSel, setDataSel ] = React.useState({
      provincestate: null,
      districtstate: null,
      ward: null
   })
   const [ numaddress, setNumaddress ] =  React.useState({})
   const [address, setAddress] = React.useState({
      address: null,
      totaladdress: null  
   })
   const [datatime, setDataTime] =  React.useState({
      hour: null,
      min: null
   })
   const [ dataClear, setDataClear  ] = React.useState({
      workhour: null,
      area: null,
      numberroom: null
   })
   const [ totalBill, setBill] = React.useState({})
   const [km, setKM] = React.useState(0)
// end state
   React.useEffect(() =>{
      getAddressAPI()
      getDataService()
      getVoucherById( )
      getDataStaff()
      // console.log(hours);
   },[isLoad])

   const hours = [
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

   const workhours = [
      {label: '3h', value: 3},
      {label: '4h', value: 2},
      {label: '5h', value: 6},
   ]

   const area = [
      { label: '80 m2', value: 0.8},
      { label: '120 m2', value: 1.2},
      { label: '180 m2', value: 1.8}
   ]
   const number_room = [
      { label: '3', value: 3},
      { label: '4', value: 4},
      { label: '5', value: 5},
      { label: '6', value: 6},
      
   ]

   const loop = [
      {
         key: '1',
         text: 'C??'
      },
      {
         key: '0',
         text: 'Kh??ng'
      }
   ]
//getDataSerive
   const getDataService = async() =>{
      const dataService =  await axios.get(`${host}/clear/getDataForApp`)
      if (dataService.data.data){
         setDataForApp(dataService.data.data)
      }else{
         console.log('err');
      }
   }

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
            address: "B???n ch??a ch???n ?????a ch???"
         })
      }else{
         const addressdata = dataSel.ward+', '+dataSel.districtstate+', '+dataSel.provincestate
         setAddress({
            ...address,
            address: addressdata
         })
      }
      // console.log(dataSel.ward,dataSel.districtstate,dataSel.provincestate);
      
   }
//endAdress

   const getDataStaff = async() =>{

      const dataStaffClear =  await axios.post(`${host}/staff/dataStaffClear`)
      setDataStaffClear(dataStaffClear.data)

   }


   const getVoucherById = async ()=>{
      const idUser = user.users.data._id
      const data = await axios.post(`${host}/voucher/getVoucherByIdClear`,{
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
            "Th??ng b??o",
            "B???n mu???n d??ng m?? gi???m gi?? n??y?",
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
            "Th??ng b??o",
            "M?? khuy???n m??i kh??ng c??!",
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

   const changeDate = async(date) =>{
      const dateChoosed = date
      // const nowdate = new Date(Date.now()+1*24*60*60*1000)
      const nowdate = new Date()
      if ((dateChoosed.getTime() > nowdate.getTime())){
         setdate(dateChoosed)
      }else{
         return Alert.alert('Ch???n ng??y sau ng??y hi???n t???i!')
      }
   } 

   const reqStaff = async(val_Id, nameStaff) =>{
      setListStaff({
         id: val_Id,
         name: nameStaff
      })   
   }
   
   

   const onNext = async( ) =>{
      // console.log(km);
      if ((datatime.hour === null) || (datatime.min === null) 
         || (address.address ==="B???n ch??a ch???n ?????a ch???" ) || (dataClear.workhour === null) 
         || (dataClear.area === null) || (dataClear.numberroom === null) || (numaddress === null) ){
            return Alert.alert('Vui l??ng ??i???n ????? th??ng tin!')
         }else{
            const dataTotal = numaddress+', '+address.address
            setAddress({...address, totaladdress: dataTotal})
            // console.log(dataTotal);
            // console.log(address.address);
            // console.log(numaddress);
            // console.log(datee);
            // console.log(datatime.hour, datatime.min);
            // console.log(dataClear);
            const totalBill =( dataClear.workhour.value * dataForApp[1] + dataClear.area.value * dataForApp[2] + dataClear.numberroom.value * dataForApp[0] )- Number(km)
            // console.log(totalBill);  
            setBill(totalBill)
            // console.log(totalBill);
         }
   }

   

   const onSubmit = async() =>{
      // console.log(user.users.data._id, user.users.data.fullname);
      const sendtime = datatime.hour.label + ':' + datatime.min.label
      
      const cleardata = await axios.post(`${host}/clear/create`,{
         userID: user.users.data._id,
         userName: user.users.data.fullname,
         address: address.totaladdress,
         date: datee, 
         time: sendtime,
         timework: dataClear.workhour.value,
         area: dataClear.area.value,
         numberroom: dataClear.numberroom.value,
         money: totalBill,
         km: km,
         voucher: dataVoucherSend,
         staff: listStaff
      })
   }

   return(
      <View style={{flex:1 , backgroundColor: 'rgba(200,200,200,0.8)'}}>
         <View style={styles.container}>

            <View style={styles.header}>
               <View style={{flexDirection: 'row', marginHorizontal: 10,marginTop: 36}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                     <Ionicons name="arrow-back-sharp" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={{fontSize:20, marginLeft:10, color: 'white',fontWeight:'900'}}>D???n d???p nh??</Text>
                  {/* <Text onPress={()=>console.log(province)}>aaaaaaaaaaaaaaaa</Text> */}
               </View>
            </View>
            
            <View style={{ marginTop: -30 ,height: 600,  marginHorizontal: 10, borderRadius: 10, backgroundColor: 'rgba(250,250,250,1)' }} >

{/* ScrollView */}
               <View style={{ marginVertical: 10, marginHorizontal: 10,height: '100%' }}>

                  {/* <Text onPress={()=>console.log(dataCity)}>aaaaaaaa</Text> */}
                  <ScrollView
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}   
                  >
                     <Text style={{ color: 'gray',marginBottom: 3,fontSize: 11}}> N??I L??M VI???C </Text>
                     <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                     }}>
                        <Text onPress={()=> setModalVisible(true)} style={styles.txtDiachi}>{address.address}</Text>
                     </View>
                     
                     <View style={{
                        marginTop: 10,
                        // marginHorizontal: 20
                     }}>
                        <Text style={{ color: 'gray', marginBottom: 3,fontSize: 11}}> S??? NH?? </Text>
                        <TextInput
                           onChangeText={(val)=>{setNumaddress(val)}}
                           style={styles.txtSonha} 
                           placeholder={'Nh???p s??? nh??'}
                        ></TextInput>
                     </View>
                     <View style={{marginTop: 20, marginBottom: 60}}>
                        <Text style={{color: 'gray',marginBottom: 20}}>TH??NG TIN C??NG VI???C</Text>

                        <View style={styles.time}>
                           <View style={{width: '45%',marginRight: 10}}>
                              <Text style={{color: 'gray', marginBottom:3}}>Ch???n ng??y</Text>
                              <ModalDatePicker 
                                 locale="en" 
                                 onSelect={ (date) => changeDate(date) }
                                 isHideOnSelect={true}
                                 initialDate={new Date(Date.now()+1*24*60*60*1000)} 
                                 button={<Text style={{backgroundColor:'white', fontSize: 17, borderWidth: 1, borderColor: '#228B22',borderRadius: 5,paddingHorizontal: 10, textAlign: 'center', color: 'black',height: 45}}>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>}
                              />  
                           </View>

                           <View style={{width: '45%',marginLeft: 10}}>
                              <Text style={{color: 'gray', marginBottom:3}}>Ch???n gi???</Text>
                              <SelectedAD placeholder='Gi???' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={hours}
                                 onChangeItem={(item) => setDataTime({
                                    ...datatime,
                                    hour: item
                                 }) }
                              />
                              <SelectedAD placeholder='Ph??t' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={mins}
                                 onChangeItem={(item) => setDataTime({
                                    ...datatime,
                                    min: item
                                 }) }
                              />
                           </View>
                        </View>

                        <View style={{ marginTop: 10, flexDirection:'row' }}>
                           <View style={{ width: '30%', marginRight: 15 }}>
                              <Text style={{color: 'gray',marginBottom: 3}}>Gi??? l??m</Text>
                              <SelectedAD 
                                 placeholder=''
                                 style={{marginBottom: 5, borderColor: '#228B22'}} 
                                 items={workhours}
                                 onChangeItem={(item) => setDataClear({
                                    ...dataClear,
                                    workhour: item
                                 })}
                              />
                           </View>
                           
                           <View style={{ width: '30%', marginRight: 15 }}>
                              <Text style={{color: 'gray',marginBottom: 3}}>Di???n t??ch</Text>
                              <SelectedAD 
                                 placeholder=''
                                 style={{marginBottom: 5, borderColor: '#228B22'}} 
                                 items={area}
                                 onChangeItem={(item) => setDataClear({
                                    ...dataClear,
                                    area: item
                                 }) }
                              />
                           </View>
                           
                           <View style={{ width: '30%', marginBottom: 10 }}>
                              <View>
                              <Text style={{color: 'gray',marginBottom: 3}}>S??? ph??ng</Text>
                              <SelectedAD 
                                 placeholder=""
                                 style={{marginBottom: 5, borderColor: '#228B22'}} 
                                 items={number_room}
                                 onChangeItem={(item) => setDataClear({
                                    ...dataClear,
                                    numberroom: item
                                 }) }
                                 
                              />
                              </View>
                           </View>
                        </View>
                        <View>
                           <Text style={{ 
                              color: 'gray',
                              marginBottom: 3,
                              fontSize: 11,
                              marginTop: 30
                           }}>
                           M?? GI???M GI??
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
                                 placeholder={'Nh???p m?? gi???m gi?? (n???u c??)'}
                              ></TextInput>
                              <TouchableOpacity onPress={() => checkVoucher()}>
                                 <Text style={{ marginLeft: 20, color: 'red', fontSize: 18, fontWeight: 'bold'}} >??p d???ng</Text>
                              </TouchableOpacity>
                              
                           </View>
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
                                    "Th??ng b??o!",
                                    "B???n c?? th??? ch???n nh??n vi??n mu???n y??u c???u. Ch??ng t??i s??? xem x??t y??u c???u c???a b???n!",
                                    // "C?? th??? ph??t sinh th??m ph??"
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
                                 }}>Y??U C???U NH??N VI??N</Text>
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
                  </ScrollView>
                  
               </View>
            </View>
                  <TouchableOpacity 
                     onPress={()=>{onNext(),
                                 ((datatime.hour === null) || (datatime.min === null) 
                                 || (address.address ==="B???n ch??a ch???n ?????a ch???" ) || (dataClear.workhour === null) 
                                 || (dataClear.area === null) || (dataClear.numberroom === null) || (numaddress === null) )?
                                 setModalVisible1(modalVisible1)
                                 :setModalVisible1(!modalVisible1)
                              }}
                  >
                     <View style={{
                        position: 'relative',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        height: 50,
                        marginTop: 10,
                        // marginBottom: 10, 
                        backgroundColor: 'rgb(46, 139, 87)',
                        alignItems: 'center',
                        justifyContent: 'center'
                     }}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold'}}>Ti???p t???c</Text>
                     </View>
                  </TouchableOpacity>
         </View>

         

         <View>
            
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
                        >DANH S??CH NH??N VI??N</Text>
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
                                 data={dataStaffClear}
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
                                 <Text style={{color: 'gray'}}>B???N ???? CH???N</Text>
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
                                       <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>X??c nh???n</Text>
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
                        <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible), changeAddress()}}>
                           <Ionicons  name='close-circle' size={26} color={'red'} style={{ marginTop: 10}} />
                        </TouchableOpacity>
                        
                        <Text style={{marginTop: 0,marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>?????a ch???</Text>
            {/* Modal dia chi */}
                        <SelectedAD 
                           placeholder={'Ch???n th??nh ph???/t???nh'}
                           containerStyle={{height: 50, marginTop: 10}}
                           // onValueChange={(val)=>changCity(val)}
                           items={province}
                           onChangeItem={(item) => changeCity(item) }
                        />
                        <SelectedAD
                           placeholder={'Ch???n huy???n/qu???n'}
                           containerStyle={{height: 50, marginTop: 10}}
                           onChangeItem={(item)=> changeDistrict(item) }
                           items={district}
                           value={dataSel.districtstate}
                        />
                        <SelectedAD
                           placeholder={'Ch???n X??/Ph?????ng'}
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
                                 <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Ch???n ?????a ch??? n??y</Text>
                           </LinearGradient>
                        </TouchableOpacity>
                     </View>
                     
                  </View>
               </Modal>

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
                              
                              <Text style={{marginTop: 0,marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>N???u ??n</Text>
                  {/* Modal dia chi */}
                              {
                                 ((datatime.hour === null) || (datatime.min === null) 
                                 || (address.address ==="B???n ch??a ch???n ?????a ch???" ) || (dataClear.workhour === null) 
                                 || (dataClear.area === null) || (dataClear.numberroom === null) || (numaddress === null) )? 
                                 <View></View>
                                 :
                                 <View>
                                    <ScrollView>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{ marginRight: 10}}>?????a ch???: </Text>
                                          <Text style={{ flex:1, textAlign: 'right' }} >{address.totaladdress}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Ng??y:   </Text>
                                          <Text>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Th???i gian:  </Text>
                                          <Text>{datatime.hour.label +' gi??? '+ datatime.min.label+' ph??t'}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Di???n t??ch:  </Text>
                                          <Text>{dataClear.area.label}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>S??? ph??ng:  </Text>
                                          <Text>{dataClear.numberroom.label} ph??ng</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Th???i gian l??m:  </Text>
                                          <Text>{dataClear.workhour.label}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>T???ng ti???n:  </Text>
                                          <Text>{totalBill} VN??</Text>
                                       </View>
                                    </ScrollView>
                                 </View>
                              }
                              
                              
                  {/* End dia chia */}
                              <TouchableOpacity 
                                 onPress={() => { onSubmit(),
                                    setModalVisible1(!modalVisible1)
                                    navigation.navigate('Home')
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
                                       borderWidth: 1, 
                                       justifyContent: "center", 
                                       alignItems: 'center', 
                                       marginBottom: 20    
                                    }}
                                 >
                                       <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>X??c nh???n</Text>
                                 </LinearGradient>
                              </TouchableOpacity>
                           </View>
                           
                        </View>
                  </Modal>
         </View>



      </View>

   )
}
export default ClearScreen;


const styles = StyleSheet.create({
   container: {
      flex:1,
      // backgroundColor: 'red'
   },
   header:{
      height: 120,
      backgroundColor: '#043927',
      
   },
   txtDiachi:{
      height: 45,
      borderWidth: 1,
      borderColor: '#228B22',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12
   },
   txtSonha:{
      height: 45,
      borderWidth: 1,
      borderColor: '#228B22',
      borderRadius: 5,
      paddingHorizontal: 10
   },
   time: {
      flexDirection:'row'
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
})