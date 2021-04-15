import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Dimensions, ScrollView, StatusBar,TextInput, KeyboardAvoidingView,Image, TouchableOpacity, TouchableHighlight } from 'react-native';
const { width,height }  = Dimensions.get("screen");


const HomeScreenChild = ({navigation}) =>{

   return(
      
      <View style={{flex: 1, width: width, height: height}}>
         <StatusBar  backgroundColor='black'/>
         <View style={{
                  flex: 1,
                  // backgroundColor: "blue",
                  // marginHorizontal: 20

         }}>
            <View 
               style={{
                  flex: 1/8,
                  backgroundColor: "#043927",
                  alignItems: 'center',
                  justifyContent: "center"
               }}
            >
               <Text 
                  style={{
                     color: 'white',
                     fontSize: 20,
                     fontWeight: "bold"
                  }}
               >
                  DỊCH VỤ
               </Text>
            </View>

            <View 
               style={{
                  flex: 9/10,
                  borderWidth: 1,
                  width: width,
                  backgroundColor: 'rgb(255, 255, 255, 0.5)',
               }}
            >
               <View 
                  style={{
                     flex: 1,
                     marginVertical: 10,
                     marginTop: -25,
                  }}
               >
{/* Menu dịch vụ */}
                  <ScrollView>
                     <View>
        {/* Dọn nhà */}
                     <TouchableHighlight underlayColor="white" onPress={()=>navigation.navigate('ClearScreen')}>
                        <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center',                              
                           }}
                        >
                           <TouchableOpacity onPress={()=>navigation.navigate('ClearScreen')}>
                              <Image source={require('../../assets/images/cleaning-tools(1).png')} style={{ width: 100 , height: 100, opacity: 1}} />
                              <Text style={{textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Dọn dẹp nhà</Text>
                           </TouchableOpacity>
                        </View>
                     </TouchableHighlight>
   {/* Vệ sinh Sofa */}
                        {/* <View  
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity>
                              <Image source={require('../assets/images/sofa(1).png')} style={{ width: 100 , height: 100}} />
                              <Text style={{textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Vệ sinh Sofa</Text>
                           </TouchableOpacity>
                        </View> */}
         {/* Nấn ăn */}
                     <TouchableHighlight underlayColor="white" onPress={()=>navigation.navigate('CookingScreen')}>
                        <View 
                           
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity onPress={()=>navigation.navigate('CookingScreen')} >
                              <Image source={require('../../assets/images/pot(1).png')} style={{ width: 100 , height: 100}} />
                              <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Nấu ăn</Text>
                           </TouchableOpacity>
                        </View>
                     </TouchableHighlight>
      {/* Vệ sinh máy lạnh */}
                        {/* <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity>
                              <Image source={require('../assets/images/air-conditioner.png')} style={{ alignSelf: 'center', width: 100 , height: 100}} />
                              <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Vệ sinh máy lạnh</Text>
                           </TouchableOpacity>
                        </View> */}
                   
         {/* Đi chợ */}
                        {/* <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity>
                              <Image source={require('../assets/images/groceries.png')} style={{ width: 100 , height: 100}} />
                              <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Đi chợ</Text>
                           </TouchableOpacity>
                        </View> */}

      {/*Vệ sinh nhà */}
                        {/* <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity>
                              <Image source={require('../assets/images/house-cleaning.png')} style={{ width: 100 , height: 100}} />
                              <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Vệ sinh nhà</Text>
                           </TouchableOpacity>
                        </View>       */}

         {/*Khử khuẩn */}
                        {/* <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity>
                              <Image source={require('../assets/images/disinfection.png')} style={{ width: 100 , height: 100}} />
                              <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Khử khuẩn</Text>
                           </TouchableOpacity>
                        </View>             */}

      {/*Khử khuẩn */}
                     <TouchableOpacity onPress={()=>navigation.navigate('WashingScreen')}>
                        <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity onPress={()=>navigation.navigate('WashingScreen')}>
                              <Image source={require('../../assets/images/washing-machine.png')} style={{ width: 100 , height: 100}} />
                              <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: 'gray' }}>Giặc ủi</Text>
                           </TouchableOpacity>
                        </View> 
                     </TouchableOpacity>
         {/* Làm vườn               */}
                        <View 
                           style={{
                              flex:1,
                              width: width /1.1,
                              height: 180,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 30,
                              elevation: 10,
                              justifyContent:'center',
                              alignItems: 'center'
                           }}
                        >
                           <TouchableOpacity>
                              <Image source={require('../../assets/images/farming.png')} style={{ alignSelf:'center', width: 100 , height: 100}} />
                              <Text style={{ fontSize: 16, marginTop: 10, color: 'gray' }}>Chăm sóc sân vườn</Text>
                           </TouchableOpacity>
                        </View>

                       

                     </View>
                  </ScrollView>
                  <Text onPress={()=>AsyncStorage.removeItem('Token')} >aaaaaaaaaa</Text>
               </View>
            </View>
         </View>

      </View>
      
   )


}

export default HomeScreenChild;