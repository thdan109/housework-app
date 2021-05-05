import React from 'react'
import { View, Text, Dimensions, StyleSheet, StatusBar, FlatList} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { TextInput } from 'react-native-paper';


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
     id: '58694a0f-3da1-471f-bd96-145571e29d72',
     title: 'Third Item',
     name: 'Mr.Three'
   },
 ];

 const Item = ({ title,name }) => (
   <View style={styles.item}>
     <Text style={styles.title}>{title}</Text>
     {/* <Text style={styles.name}>{name}</Text> */}
   </View>
 );



const Notification = () =>{
   
   const renderItem = ({ item }) => (
      <>
        <Item title={item.title} />
         <Item title={item.name} />
      </>
    
    );

   return (
     <View style={styles.container}>
         <StatusBar />
         <View style={styles.header} >
            <LinearGradient style={{flex:1}} colors={["#043927","#043927"]}>
               <Text style={{marginTop: 20,fontSize: 26,textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Thông báo</Text>
            </LinearGradient>
         </View>
         <View style={styles.showNotifi}>
            <View style={styles.containerFlatlist}>
               <FlatList 
                  style={styles.Flatlist}
                  data={DATA}
                  keyExtractor={item => item.id}
                  renderItem={({item}) =>(
                     <View style={styles.renderFlatlist} >
                        <Text>{item.title}</Text>
                     </View>

                  )}
               />
            </View>



         </View>



         {/* <View>
            <TextInput style={{ borderWidth: 1}}></TextInput>
         </View> */}

     </View>




   )





}

export default Notification


const styles = StyleSheet.create({

   container: {
      flex:1
   }, 
   header:{
      height: 120,
   },
   showNotifi:{
      flex:1,
      marginBottom: 10,
      marginTop: -30,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      backgroundColor: 'white'
   },
   containerFlatlist:{
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 10
   },
   
   Flatlist:{
      // height: 91,
      // borderWidth: 1,
      
   }
   ,renderFlatlist:{
      height: 91,
      borderWidth: 1,
      marginBottom: 10
   }



})