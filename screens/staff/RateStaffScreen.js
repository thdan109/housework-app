import React from 'react'
import { View, Text, Dimensions, StyleSheet, StatusBar, FlatList, TouchableOpacity, Button} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import host from '../../host'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Moment from 'moment'
import {Rating} from 'react-native-elements'

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






const RateStaffScreen = ({navigation}) =>{

   const staff = useSelector(state => state)

   // const renderItem = ({ item }) => (
   //    <>
   //      <Item title={item.title} />
   //       <Item title={item.name} />
   //    </>
   //  );
   const [data, setData] = React.useState()

   React.useEffect(()=>{
      getDataFeeback()
   },[])

   const  getDataFeeback = async( ) =>{
      const idStaff = staff.users.data._id 
      const data = await axios.post(`${host}/reportstaff/getDataRating`,{
         idStaff: idStaff
      })
      setData(data.data)
   }

   return (
     <View style={styles.container}>
         <StatusBar />
         <View style={styles.header} >
         
            <LinearGradient style={{flex:1}} colors={["#FFFACD","#FFFACD"]}>
               <View style={styles.tiltleHeader}>
                  <TouchableOpacity style={{marginHorizontal: 15,marginTop: 5}}  onPress={()=>navigation.navigate('NavigatorStaff')}>
                     <Ionicons name="chevron-back" size={28} color="black" />
                  </TouchableOpacity>
                  <Text style={{marginTop: 0,flex:1,fontSize: 18.1,textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop: 3}}>ĐÁNH GIÁ CỦA BẠN</Text>
                  <TouchableOpacity style={{marginHorizontal: 15,marginTop: 5, opacity: 1 }}  onPress={()=>getDataFeeback()}>
                     <Ionicons name="refresh" size={28} color="black" style={{opacity: 0}}  />
                  </TouchableOpacity>
               </View>
               <View style={{ marginVertical: 5, width: '100%',alignItems:'center' }}>
                  <View style={{flexDirection: 'row'}}>
                     <Rating readonly={true}  fractions={1} startingValue={(staff.users.data.rating)}   tintColor="#FFFACD" imageSize={20} />
                     <Text style={{fontWeight: 'bold'}}>  {Number(staff.users.data.rating).toFixed(1)}/5</Text>
                  </View>
                  
                  <Text style={{fontWeight: 'bold'}}>Tổng {data?.length} đánh giá</Text>
               </View>
            </LinearGradient>
         </View>
         <View style={styles.showNotifi}>
            {/* <Text onPress={()=>console.log(data)}>aaaaaaaaaaaaaaa</Text> */}
            <View style={styles.containerFlatlist}>
               <FlatList 
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={styles.Flatlist}
                  data={data}
                  keyExtractor={item => item._id}
                  renderItem={({item,index}) =>(
                     <View style={styles.renderFlatlist} >
                        
                        <View style={{ marginBottom: 13.5, width: '100%',alignItems:'center',flexDirection:'row'}}>
                           <Rating readonly={true}  fractions={1} startingValue={(staff.users.data.rating)}   tintColor="white" imageSize={20} />
                           <Text style={{fontWeight: 'bold', textAlign: 'right', flex:1}}>{Number(item.rating).toFixed(1)}/5</Text>
                        </View>
                        <Text> Khách hàng ẩn danh</Text>
                        <Text> {item.note}</Text>
                        
                     </View>
                  )}
               />
            </View>
         </View>

         <View style={styles.containerButton}>
            <Button
               height={20}
               onPress={()=>getDataFeeback()}
               title="Làm mới"
               color="#006400"
               // accessibilityLabel="Learn more about this purple button"
            />
         </View>

         {/* <View>
            <TextInput style={{ borderWidth: 1}}></TextInput>
         </View> */}

     </View>




   )





}

export default RateStaffScreen


const styles = StyleSheet.create({

   container: {
      flex:1,
      backgroundColor: '#FFFACD'
   }, 
   header:{
      height: 120,
   },
   showNotifi:{
      flex:1,
      marginBottom: 0,
      marginTop: -30,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      backgroundColor: 'rgba(230,230,230,1)',
      borderRadius: 30
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
      backgroundColor: 'white'

   },
   containerButton:{
      marginVertical: 20,
      marginHorizontal: 10
   },
   button:{
      // height: 20
   },
   tiltleHeader:{
      backgroundColor: '#F0E68C',
      flexDirection: 'row',

   }



})