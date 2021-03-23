import React from 'react';
import{View, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import SelectedAD from 'react-native-dropdown-picker'

const AddressSelected = ( ) =>{

   const [ province, setProvince] = React.useState([])
   const [ district, setDistrict] = React.useState([])
   const [ ward, setWard ] = React.useState([])
   const [ dataSel, setDataSel ] = React.useState({
      provincestate: '',
      districtstate: '',
      ward: ''
   })
   const [isEnabled, setIsEnabled] = React.useState(false);
   
   React.useEffect(() =>{
      getAddressAPI()
   },[])

   const getAddressAPI = async() =>{
      const getData =  await axios.get('https://thongtindoanhnghiep.co/api/city')
      let datamap = getData.data.LtsItem
      datamap = datamap.map(dt =>{
         return {
            'id': dt.ID,
            'label': dt.Title,
            'value': dt.Title
         }
      })
      datamap.pop()
      setProvince(datamap)
   }

   const changeCity = async(item) =>{
      const provinceNow = province.filter(data => { return data.value == item.value   })
      // console.log(provinceNow.length);
      if (provinceNow.length){
         const changeCT = await axios.get('https://thongtindoanhnghiep.co/api/city/'+provinceNow[0].id+'/district')
         let dataCity = changeCT.data.map(dt =>{
            return {
               'id': dt.ID,
               'label': dt.Title,
               'value': dt.Title
            }
         }) 
         setDistrict(dataCity)
         // console.log(dataCity);
         setDataSel({
            ...dataSel,
            provincestate: item.value
         })
      }
      
   }

   const changeDistrict = async (item) =>{
      const districtNow = district.filter(data => {return data.value == item.value })
      if (districtNow.length){
         const changeDT = await axios.get('https://thongtindoanhnghiep.co/api/district/' + districtNow[0].id + '/ward')
         let dataDT  =  changeDT.data.map(dt =>{
            return{
               'id': dt.ID,
               'label': dt.Title,
               'value': dt.Title
            }
         })
         setWard(dataDT)
         setDataSel({
            ...dataSel,
            districtstate: item.value
         })
      }  
   }

   return(
     <View style={{flex:1}}>
        {/* <Text style={{marginBottom: 25}}>asdasd</Text> */}
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
       
         {/* <TouchableOpacity  onPress={() => console.log('aaa')}>
            <View style={{
               marginVertical: 20,
               // borderWidth: 1,
            }}>
               <LinearGradient
                  colors={['#0ba360', '#3cba92']}
                  style={{ height: 50, justifyContent: 'center', 
                           alignContent:  'center',
                           alignItems: 'center'
                  }}
               >
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Chọn địa chỉ này</Text>
               </LinearGradient>
               
            </View>
         </TouchableOpacity> */}
     </View>
   )
}

export default AddressSelected;
