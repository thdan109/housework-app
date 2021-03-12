import React from 'react';
import { View, Text, Dimensions, ScrollView, StatusBar,TextInput, KeyboardAvoidingView } from 'react-native';
const { width,height }  = Dimensions.get("screen");


const HomeScreenChild = () =>{

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
                  backgroundColor: 'rgb(245, 245, 245, 0.9)',
               }}
            >
               <View 
                  style={{
                     flex: 1,
                     marginVertical: 10,
                     marginTop: -25,
                  }}
               >
                  <ScrollView>
                     <View>
                        <View 
                           style={{
                              width: width /1.1,
                              height: height / 10,
                              // borderWidth: 1,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 15,
                              elevation: 10
                           }}
                        >
                           <Text>Tên chức năng</Text>
                        </View>
                        <View 
                           style={{
                              width: width /1.1,
                              height: height / 10,
                              marginHorizontal: 18,
                              borderRadius: 15,
                              backgroundColor: "white",
                              marginBottom: 15,
                              elevation: 10
                           }}
                        >
                           <Text>Tên</Text>
                           
                        </View>
                     </View>
                  </ScrollView>
                  <TextInput placeholder={'aaaaaaaaaaa'}></TextInput>
               </View>
            </View>
         </View>

      </View>
      
   )


}

export default HomeScreenChild;