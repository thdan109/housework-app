import React from 'react';
import {View,Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo } from '@expo/vector-icons';
import axios from 'axios'

import host from '../host'

const {width, height} = Dimensions.get('screen')

const OrderScreen = ({ navigation }) =>{

   React.useEffect( ()=>{

   },[])

   const [menu, setMenu] = React.useState(false) 
   const [ dataCooking, setDataCooking] = React.useState()
   const [ dataClear, setDataClear] = React.useState()

   const getOrder = async() =>{
      // console.log('aaa');
      const token_val = await AsyncStorage.getItem('Token')
      // console.log(token_val);
      
      const dataOrder = await axios.get(`${host}/user/getOrder`,{
         headers: {
            Authorization: `Bearer ${token_val}`,
         }
      })
      if (dataOrder.data.orderCooking){
         setDataCooking(dataOrder.data.orderCooking)
      }
      if (dataOrder.data.ordeClear){
         setDataClear(dataOrder.data.ordeClear)
      }
   }


   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={{fontSize:20, color: 'white', fontWeight:'bold', textAlign: 'center', marginTop: 30}}>Việc đang chờ</Text>
         </View>

         <View style={{ marginTop: -30  }} >
            <View style={styles.renderlist}>
               <View style={{ marginHorizontal: 10, marginVertical: 5}}>
                  <View style={{flexDirection:'row'}}>
                     <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1}} >Tên công việc</Text>
                     <TouchableOpacity onPress={()=>{setMenu(!menu)}} >
                        {menu===false ?
                          <Entypo name="chevron-down" size={30} color="black" />
                           :
                           <Entypo name="chevron-up" size={30} color="black" />
                        }
                        
                     </TouchableOpacity>
                  </View>

                  {
                     menu===true &&
                        <View style={styles.details}>
                           <Text>aaa</Text>
                           <Text>aaaa</Text>
                        </View>
                  }

               </View>
               <TouchableOpacity onPress={()=>getOrder()}>
                  <Text>aaaaaaaaaaaaaaaaa</Text>
               </TouchableOpacity>
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
   renderlist: { borderWidth: 1, borderRadius: 10, marginHorizontal: 10, backgroundColor: 'white'},

   details: {
      height: 60
   }

})