import * as React from 'react';
import {View,Text,Modal, TouchableOpacity} from 'react-native'
import { List } from 'react-native-paper';
import { useDispatch, useSelector} from 'react-redux'
import SelectedAD from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const MyComponent = () => {
   const [expanded, setExpanded] = React.useState(true);
   const work = useSelector(state =>state) 
   const handlePress = () => setExpanded(!expanded);


   const [ province, setProvince] = React.useState([])
   const [ district, setDistrict] = React.useState([])
   const [ ward, setWard ] = React.useState([])
   const [ dataSel, setDataSel ] = React.useState({
      provincestate: null,
      districtstate: null,
      ward: null
   })
   // const [ numaddress, setNumaddress ] =  React.useState("1")
   const [address, setAddress] = React.useState({
      address: null,
      totaladdress: null  
   })
   React.useEffect(()=>{
      getAddressAPI()
      // changeCity()
   },[])

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
      console.log(dataSel.ward,dataSel.districtstate,dataSel.provincestate);
      
   }


  return (
   <View>
      {/* <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
         }}
         > */}
         <TouchableOpacity  onPress={()=> console.log(province)}>
         <View style={{ height: 30, backgroundColor: 'red', marginTop: 20}} >
            
            </View>
         </TouchableOpacity>
         <TouchableOpacity  onPress={()=> console.log(district)}>
         <View style={{ height: 30, backgroundColor: 'yellow', marginTop: 20}} >
            
            </View>
         </TouchableOpacity>
         <TouchableOpacity  onPress={()=> console.log(ward)}>
         <View style={{ height: 30, backgroundColor: 'red', marginTop: 20}} >
            
            </View>
         </TouchableOpacity>
            

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
                  <TouchableOpacity onPress={()=>{
                     // setModalVisible(!modalVisible), 
                     // changeAddress()
                     }}>
                     {/* <Ionicons  name='close-circle' size={26} color={'red'} style={{ marginTop: 10}} /> */}
                  </TouchableOpacity>
                  
                  <Text style={{marginTop: 0,marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Địa chỉ</Text>
      {/* Modal dia chi */}
                  <SelectedAD 
                     placeholder={'Chọn thành phố/tỉnh'}
                     containerStyle={{height: 50, marginTop: 10}}
                     items={province}
                     onChangeItem={(item) => changeCity(item) }
                  />
                  <SelectedAD
                     placeholder={'Chọn huyện/quận'}
                     containerStyle={{height: 50, marginTop: 10}}
                     items={district}
                     onChangeItem={(item)=> changeDistrict(item) }
                     value={dataSel.districtstate}
                  />
                  <SelectedAD
                     placeholder={'Chọn Xã/Phường'}
                     items={ward}
                     onChangeItem={(item)=>setDataSel({
                                    ...dataSel,
                                    ward: item.value
                                 })}
                     containerStyle={{height: 50, marginTop: 10}}
                     // value={dataSel.wardstate}
                  />
      {/* End dia chia */}
                  <TouchableOpacity 
                     onPress={() => {
                        // setModalVisible(!modalVisible),
                        changeAddress()
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
                           <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Chọn địa chỉ này</Text>
                     </LinearGradient>
                  </TouchableOpacity>
               </View>
               
            </View>
         {/* </Modal> */}
   </View>

      
    
  );
};

export default MyComponent;