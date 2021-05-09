import React from 'react'
import {View, Text, Dimensions,StyleSheet, StatusBar, TouchableOpacity, FlatList} from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import host from '../../host'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Star } from "react-native-user-feedback"
import UserFeedback from 'react-native-user-feedback';
import {Rating} from 'react-native-elements'


const {width, height} =  Dimensions.get('screen')



const ShowFeedBackScreen = ({navigation}) =>{

   
   const user = useSelector(state=>state)
   const [data, setData] = React.useState()

   React.useEffect(()=>{
      getDataFeedBack()
   },[])


   const getDataFeedBack = async ()=>{
      const data  = await axios.post(`${host}/feedback/getDataFeedBackForApp`)
      setData(data.data)
   }

      return(

         <View style={styles.container}>  
            <StatusBar/> 
            <View style={styles.header}>
               <View style={styles.Name}>
                  <TouchableOpacity onPress = {()=>navigation.goBack()}>
                     <Ionicons name="chevron-back-outline" size={36} color="white" style={{ justifyContent: 'flex-start' }} />
                  </TouchableOpacity>
                  <Text style={{flex: 1, textAlign:'center', fontSize: 23, fontWeight: 'bold', color: 'white'}}>
                     ĐÁNH GIÁ
                  </Text>
                  <Ionicons name="chevron-back-outline" size={36} color="#043927" style={{justifyContent: 'flex-end', opacity: 0}} />
               </View>

            </View>
            <View style={styles.content}>
               {/* <Text onPress={() =>console.log(data)} >aaaaaaaaaaaa</Text> */}
               <View style={styles.Flatlist}>
                  <FlatList 
                     showsVerticalScrollIndicator={false}
                     showsHorizontalScrollIndicator={false}
                     // style={styles.Flatlist}
                     data={data}
                     keyExtractor={item => item._id}
                     renderItem={({item,index}) =>(
                        <View style={styles.renderFlatlist} >
                           <View style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: 'bold', fontSize: 16, flex:1}}>{item.nameUser}</Text>
                              <Rating fractions={1} startingValue={item.rate}  type='custom' tintColor="#B0C4DE" imageSize={20} />
                           </View>
                           
                           <Text style={{fontSize: 14, marginTop: 10}}>{item.contentfeedback}</Text>
                           
                           
                        </View>
                        
                     )}
                  />

               </View>
               


            </View>


         </View>



      )                                                                                                                                                                                                                                                                                                               


}


export default ShowFeedBackScreen



const styles = StyleSheet.create({

   container:{
      flex:1,
      // backgroundColor: 
   },
   header:{
      height: 40,
      justifyContent: 'center',
      backgroundColor: '#043927',
      // alignItems: 'center'
      // alignContent: 'center'
   },
   Name:{      
      // justifyContent:'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1
   }, 
   content:{
      flex:1,
      // backgroundColor: 'red'
   }, 
   Flatlist:{
      // flex:1, 
      // backgroundColor: 'gray'
   },
   renderFlatlist:{
      marginTop: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      // paddingVertical: 15,
      paddingBottom: 30,
      paddingTop: 10,
      // borderWidth:1,
      backgroundColor: '#B0C4DE'
   }



  
   
})




