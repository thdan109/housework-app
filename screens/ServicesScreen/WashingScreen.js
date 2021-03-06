import React from 'react'
import {View, Text, Dimensions, StyleSheet, ScrollView, Modal,TextInput, TouchableOpacity,Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import host from '../../host'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import SelectedAD from 'react-native-dropdown-picker';
import { ModalDatePicker } from "react-native-material-date-picker";
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

const {width, height} = Dimensions.get('screen')

const WashingScreen = ( { navigation}  ) =>{
   const user = useSelector(state => state)
// state
   const [modalVisible, setModalVisible] = React.useState(true);
   const [modalVisible1, setModalVisible1] = React.useState(false);

   const [ dataKG, setDataKG ] = React.useState({})
   const [ dataNote, setDataNote] = React.useState([])
   const [ dateSend, setDateSend] = React.useState(new Date(Date.now()+1*24*60*60*1000))
   const [ dateTake, setDateTake] = React.useState(new Date(Date.now()+2*24*60*60*1000))
   const [ province, setProvince] = React.useState([])
   const [ district, setDistrict] = React.useState([])
   const [ ward, setWard ] = React.useState([])
   const [dataForApp, setDataForApp] = React.useState()
   const [dataVoucher, setDataVoucher] = React.useState()
   const [codeVoucher, setCodeVoucher] = React.useState()
   const [dataVoucherSend, setDataVoucherSend] = React.useState()
   const [km, setKM] = React.useState(0)



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
   const [dataTimeTake, setDataTimeTake] =  React.useState({
      hourTake: null,
      minTake: null
   })
   const [ dataTimeSend, setDataTimeSend] = React.useState({
      hourSend: null,
      minSend: null
   })
   const [ dataClear, setDataClear  ] = React.useState({
      workhour: null,
      area: null,
      numberroom: null
   })
   const [ totalBill, setBill] = React.useState({})
// end state
   React.useEffect(() =>{
      getAddressAPI()
      getVoucherById()
      getDataService()
      // console.log(hours);
   },[])

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
   const KG = [
      { label: '3KG  --------  45.000đ', value: 45000},
      { label: '4KG  --------  60.000đ', value: 60000},
      { label: '5KG  --------  75.000đ', value: 75000},
      { label: '6KG  --------  90.000đ', value: 90000},
      { label: '7KG  --------  105.000đ', value: 105000},
      { label: '8KG  --------  120.000đ', value: 120000},
      { label: '9KG  --------  135.000đ', value: 135000},
      { label: '10KG --------  150.000đ', value: 150000},
   ]
   // const Gia = [
   //    { label: '15,000đ', value: 15000},
   //    { label: '15,000đ', value: 15000},
   // ]
   

   const getDataService = async() =>{
      const dataService =  await axios.get(`${host}/washing/getDataForApp`)
      if (dataService.data.data){
         setDataForApp(dataService.data.data)
      }else{
         console.log('err');
      }
      

   }


//addressAPI
   // const getAddressAPI = async() =>{
   //    const getData =  await axios.get('https://thongtindoanhnghiep.co/api/city')
   //    let datamap = getData.data.LtsItem
   //    datamap = datamap.map(dt =>{
   //       return {
   //          'id': dt.ID,
   //          'label': dt.Title,
   //          'value': dt.Title
   //       }
   //    })
   //    datamap.pop()
   //    setProvince(datamap)
   // }

   // const changeCity = async(item) =>{
   //    const provinceNow = province.filter(data => { return data.value == item.value   })
   //    // console.log(provinceNow.length);
   //    if (provinceNow.length){
   //       const changeCT = await axios.get('https://thongtindoanhnghiep.co/api/city/'+provinceNow[0].id+'/district')
   //       let dataCity = changeCT.data.map(dt =>{
   //          return {
   //             'id': dt.ID,
   //             'label': dt.Title,
   //             'value': dt.Title
   //          }
   //       }) 
   //       setDistrict(dataCity)
   //       // console.log(dataCity);
   //       setDataSel({
   //          ...dataSel,
   //          provincestate: item.value
   //       })
   //    }
      
   // }

   // const changeDistrict = async (item) =>{
   //    const districtNow = district.filter(data => {return data.value == item.value })
   //    if (districtNow.length){
   //       const changeDT = await axios.get('https://thongtindoanhnghiep.co/api/district/' + districtNow[0].id + '/ward')
   //       let dataDT  =  changeDT.data.map(dt =>{
   //          return{
   //             'id': dt.ID,
   //             'label': dt.Title,
   //             'value': dt.Title
   //          }
   //       })
   //       setWard(dataDT)
   //       setDataSel({
   //          ...dataSel,
   //          districtstate: item.value
   //       })
   //    }  
   // }

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
      }
      // console.log(dataSel.ward,dataSel.districtstate,dataSel.provincestate);
      
   }
//endAdress
   const changeDateSend = async(date) =>{
      const dateChoosed = date
      // const nowdate = new Date(Date.now()+1*24*60*60*1000)
      const nowdate = new Date()
      if ((dateChoosed.getTime() > nowdate.getTime())){
         setDateSend(dateChoosed)
      }else{
         return Alert.alert('Chọn ngày sau ngày hiện tại!')
      }
   } 
   const changeDateTake = async(date) =>{
      const dateChoosed = date
      // const nowdate = new Date(Date.now()+1*24*60*60*1000)
      const nowdate = new Date(Date.now()+1*24*60*60*1000)
      if ((dateChoosed.getTime() > nowdate.getTime())){
         setDateTake(dateChoosed)
      }else{
         return Alert.alert('Chọn ngày nhận sau ngày đặt ít nhất 1 ngày!')
      }
   } 

   const getVoucherById = async ()=>{
      const idUser = user.users.data._id
      const data = await axios.post(`${host}/voucher/getVoucherByIdWashing`,{
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


   const onNext = async( ) =>{
      if ((dataTimeTake.hourTake === null) || (dataTimeSend.minSend === null) 
         || (dataTimeSend.hourSend === null) || (dataTimeTake.minTake === null)  
         || (address.address ==="Bạn chưa chọn địa chỉ" ) || (numaddress === null)) {
            return Alert.alert('Vui lòng điền đủ thông tin!')
         }else{
            const dataTotal = numaddress+', '+address.address
            setAddress({...address, totaladdress: dataTotal})
            console.log(dataTotal);
            // console.log(address.address);
            // console.log(dataTimeTake.hourTake+', '+ dataTimeTake.minTake);
            // console.log(dataTimeSend.hourSend+', '+dataTimeSend.minSend);
            // console.log(dateSend,dateTake);
            // console.log(dataKG.value);
            // console.log(datatime.hour, datatime.min);
            // console.log(dataClear); 
            // const totalBill = (dataKG.value + 60000) - Number(km)
            const totalBill = (dataKG.value + dataForApp[0]) - Number(km)
            // console.log(totalBill);  
            setBill(totalBill)
         }
   }
   const onSubmit = async() =>{
      console.log('aaaaa');
      // console.log(user.users.data._id, user.users.data.fullname);
      const sendtime = dataTimeSend.hourSend.label+ ':' +dataTimeSend.minSend.label
      const taketime = dataTimeTake.hourTake.label+ ':' + dataTimeTake.minTake.label
      // console.log(sendtime);
      const washingdata = await axios.post(`${host}/washing/create`,{
         userID: user.users.data._id,
         userName: user.users.data.fullname,
         address: address.totaladdress,
         dateSend: dateSend, 
         dateTake: dateTake ,
         sendTime: sendtime,
         takeTime: taketime,
         note: dataNote,
         money: totalBill, 
         km: km,
         voucher: dataVoucherSend
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
                  <Text style={{fontSize:20, marginLeft:10, color: 'white',fontWeight:'900'}}>Giặt ủi</Text>
                  {/* <Text onPress={()=>console.log(dataForApp[0]) }>aaaaaaaaaaaaaa</Text> */}
               </View>
            </View>
            
            <View style={{ marginTop: -30 ,height: 600,  marginHorizontal: 10, borderRadius: 10, backgroundColor: 'rgba(250,250,250,1)' }} >

{/* ScrollView */}
               <View style={{ marginVertical: 10, marginHorizontal: 10,height: '98%' }}>
                  <ScrollView
                     style={{height: '100%'}}
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}   
                  >
                     <Text style={{ color: 'gray',marginBottom: 3,fontSize: 11}}> NƠI LÀM VIỆC </Text>
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
                        <Text style={{ color: 'gray', marginBottom: 3,fontSize: 11}}> SỐ NHÀ </Text>
                        <TextInput
                           onChangeText={(val)=>{setNumaddress(val)}}
                           style={styles.txtSonha} 
                           placeholder={'Nhập số nhà'}
                        ></TextInput>
                     </View>
                     <View style={{marginTop: 20, marginBottom: 60}}>
                        <Text style={{color: 'gray',marginBottom: 20}}>THÔNG TIN CÔNG VIỆC</Text>

                        <View style={styles.time}>
                           <View style={{width: '45%',marginRight: 10}}>
                              <Text style={{color: 'gray', marginBottom:3}}>Chọn ngày nhận</Text>
                              <ModalDatePicker 
                                 locale="en" 
                                 onSelect={ (date) => changeDateSend(date) }
                                 isHideOnSelect={true}
                                 initialDate={new Date(Date.now()+1*24*60*60*1000)}
                                 button={<Text style={{backgroundColor:'white', fontSize: 15, borderWidth: 1, borderColor: '#228B22',borderRadius: 5,paddingHorizontal: 10, textAlign: 'center', color: 'black',height: 45}}>{Moment(dateSend).format('dddd  DD/MM/YYYY')}</Text>}
                              />  
                           </View>

                           <View style={{width: '45%',marginLeft: 10}}>
                              <Text style={{color: 'gray', marginBottom:3}}>Chọn giờ nhận</Text>
                              <SelectedAD placeholder='Giờ' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={hours}
                                 onChangeItem={(item) => setDataTimeSend({
                                    ...dataTimeSend,
                                    hourSend: item
                                 }) }
                              />
                              <SelectedAD placeholder='Phút' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={mins}
                                 onChangeItem={(item) => setDataTimeSend({
                                    ...dataTimeSend,
                                    minSend: item
                                 }) }
                              />
                           </View>
                        </View>

                        <View style={[styles.time,{marginTop:10}]}>
                           <View style={{width: '45%',marginRight: 10}}>
                              <Text style={{color: 'gray', marginBottom:3}}>Chọn ngày trả</Text>
                              <ModalDatePicker 
                                 locale="en" 
                                 onSelect={ (date) => changeDateTake(date) }
                                 isHideOnSelect={true}
                                 initialDate={new Date(Date.now()+1*24*60*60*1000)}
                                 button={<Text style={{backgroundColor:'white', fontSize: 15, borderWidth: 1, borderColor: '#228B22',borderRadius: 5,paddingHorizontal: 10, textAlign: 'center', color: 'black',height: 45}}>{Moment(dateTake).format('dddd  DD/MM/YYYY')}</Text>}
                              />  
                           </View>

                           <View style={{width: '45%',marginLeft: 10}}>
                              <Text style={{color: 'gray', marginBottom:3}}>Chọn giờ trả</Text>
                              <SelectedAD placeholder='Giờ' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={hours}
                                 onChangeItem={(item) => setDataTimeTake({
                                    ...dataTimeTake,
                                    hourTake: item
                                 }) }
                              />
                              <SelectedAD placeholder='Phút' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={mins}
                                 onChangeItem={(item) => setDataTimeTake({
                                    ...dataTimeTake,
                                    minTake: item
                                 }) }
                              />
                           </View>
                        </View>
                        
                        <View style={{ marginTop: 10, flexDirection:'row' }}>
                           <View style={{width: '100%',  marginRight: 15 }}>
                              <Text style={{color: 'gray',marginBottom: 3}}>Số KG (15.000/Kg)</Text>
                              <SelectedAD placeholder='Chọn số kg' 
                                 style={{marginBottom: 5, borderColor: '#228B22'}}
                                 items={KG}
                                 onChangeItem={(item) => setDataKG(item) }
                              />
                           </View>
                        </View>

                        <View style={{ marginTop: 10, flexDirection:'row' }}>
                           <View style={{width: '100%',  marginRight: 15 }}>
                              <Text style={{color: 'gray',marginBottom: 3}}>Ghi chú</Text>
                              <TextInput 
                                 onChangeText ={(val)=>setDataNote(val)}
                                 placeholder="Bạn cần ghi chú"  
                                 multiline={true}
                                 numberOfLines={10}
                                 style={{ height:145, textAlignVertical: 'top', borderWidth: 1, borderColor: '#228B22', borderRadius: 10, padding: 10}}></TextInput>
                           </View>
                        </View>
                        <View>
                           <Text style={{ 
                              color: 'gray',
                              marginBottom: 3,
                              fontSize: 11,
                              marginTop: 20
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
                        </View>

                     </View>
                  </ScrollView>
                  
               </View>
            </View>
                  <TouchableOpacity 
                     onPress={()=>{onNext(),
                           
                                 ((dataTimeTake.hourTake === null) || (dataTimeSend.minSend === null) 
                                 || (dataTimeSend.hourSend === null) || (dataTimeTake.minTake === null) 
                                 || (address.address ==="Bạn chưa chọn địa chỉ" ) || (numaddress === null) )?
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
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold'}}>Tiếp tục</Text>
                     </View>
                  </TouchableOpacity>
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
                              
                              <Text style={{marginTop: 0,marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Giặt ủi</Text>
                  {/* Modal dia chi */}
                              {
                                 ((dataTimeTake.hourTake === null) || (dataTimeSend.minSend === null) 
                                 || (dataTimeSend.hourSend === null) || (dataTimeTake.minTake === null)  
                                 || (address.address ==="Bạn chưa chọn địa chỉ" ) || (numaddress === null))? 
                                 <View></View>
                                 :
                                 <View>
                                    <ScrollView>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{ marginRight: 10}}>Địa chỉ: </Text>
                                          <Text style={{ flex:1, textAlign: 'right', fontWeight: 'bold' }} >{address.totaladdress}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Ngày gửi đồ:   </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{Moment(dateSend).format('dddd  DD/MM/YYYY')}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Thời gian gửi:  </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{dataTimeSend.hourSend.label +' giờ '+ dataTimeSend.minSend.label+' phút'}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Ngày trả đồ   </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{Moment(dateTake).format('dddd  DD/MM/YYYY')}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Thời gian trả  </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{dataTimeTake.hourTake.label +' giờ '+ dataTimeTake.minTake.label+' phút'}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Ghi chú </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{dataNote}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Phí ship </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{60000}</Text>
                                       </View>
                                       <View style={{flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 0.8,marginBottom: 10}}>
                                          <Text style={{flex:1}}>Tổng tiền:  </Text>
                                          <Text style={{ fontWeight: 'bold' }}>{totalBill} VNĐ</Text>
                                       </View>
                                    </ScrollView>
                                 </View>
                              }
                              
                              
                  {/* End dia chia */}
                              <TouchableOpacity 
                                 onPress={() => { onSubmit(),setModalVisible1(!modalVisible1)
                                    , navigation.navigate('Home') 
                                 }}
                                 // onPress={() => { onSubmit()}} 
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
         </View>



      </View>

   )
}
export default WashingScreen;


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
   }
})