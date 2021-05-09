import React from 'react'
import { View, Text, Dimensions, StyleSheet, StatusBar, FlatList, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import {Ionicons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import host from '../../host'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Moment from 'moment'

const { height, width} = Dimensions.get('screen')



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

   return (
     <View style={styles.container}>
         <StatusBar />
         <View style={styles.header} >
            <LinearGradient style={{flex:1}} colors={["#043927","#043927"]}>
               <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Ionicons name="chevron-back" size={27} color="white" style={{marginHorizontal: 10, marginTop:10}} />
               </TouchableOpacity>
               <Text style={{marginBottom: 10,fontSize: 26,textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Khuyến mãi của bạn</Text>
            </LinearGradient>
         </View>
         <View style={styles.showNotifi}>
          
            <View style={styles.containerFlatlist}>
               <FlatList 
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={styles.Flatlist}
                  data={data}
                  keyExtractor={item => item._id}
                  renderItem={({item,index}) =>(
                     <View style={styles.renderFlatlist} >
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.nameVoucher}</Text>
                        <Text style={{fontSize: 14, marginTop: 10}}>Mã khuyến mãi: {item.codeVoucher}</Text>
                        <Text style={{fontSize: 14, marginTop: 10}}>Ưu đãi:  <NumberFormat key={Math.random()} value={item.prince} className="foo" displayType={'text'} thousandSeparator={true} prefix={''} renderText={(value, props) => <Text {...props}>{value} VNĐ</Text>} />
                        </Text>
                     </View>
                  )}
               />
            </View>



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
      height: 130,
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
      // borderWidth: 1,
      marginBottom: 10,
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: '#BDB76B'

   }



})