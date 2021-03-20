import React from 'react'
import {View, Text, Dimensions, TouchableOpacity, TextInput,ScrollView, StyleSheet, Button, KeyboardAvoidingView, Switch} from 'react-native'
import {Ionicons} from 'react-native-vector-icons';
import RadioButton from '../../components/RadioButton';


const {width, height } = Dimensions.get('screen')

const CookingScreen = ({ navigation } )=>{
   const [selectedOption, setSelectedOption] = React.useState('2');
   const [selectedFruit, setSelectedFruit] = React.useState('0');
   const [selectedGo, setSelectedGo] = React.useState('0');
   const [isEnabled, setIsEnabled] = React.useState(false);
   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
   
   const quantum = [
      // {
      //   key: 'pay',
      //   text: '1',
      // },
      {
        key: 'performance',
        text: '2',
      },
      {
        key: 'aToZ',
        text: '3',
      },
      {
        key: 'zToA',
        text: '4',
      },
    ];

   const fruits = [
      {
         key: '1',
         text: 'Có'
      },
      {
         key: '0',
         text: 'Không'
      }
   ]

   const go = [
      {
         key: '1',
         text: 'Có'
      },
      {
         key: '0',
         text: 'Không'
      }
   ]

   var array = [];
  
   //Function button Radio
   const onSelect = (item) => {
      if (selectedOption && selectedOption.key === item.key) {
        setSelectedOption(null);
      } else {
        setSelectedOption(item);
      }
   };
    
   const onSelectfruit = (item) => {
      if (selectedOption && selectedOption.key === item.key) {
        setSelectedFruit(null);
      } else {
        setSelectedFruit(item);
      }
   };
   
   const onSelectGo = (item) =>{
      if (selectedOption && selectedOption.key === item.key){
         selectedGo(null)
      }else{
         setSelectedGo(item)
      }
   }

   return(
         <View style={{
            flex: 1, 
            backgroundColor: 'rgba(200,200,200,0.3)',
         }}>

            <View style={{
               backgroundColor: '#043927',
               height: 120
            }}>
               <View style={{
                  backgroundColor: '#043927',
                  height: 40,
                  flexDirection: 'row',
                  marginTop: 30,
                  // borderColor: 'white',
                  // borderWidth: 1
               }}>
                  <TouchableOpacity onPress={() =>navigation.navigate('Home')} >
                     <Ionicons name="arrow-back-sharp" size={24} color="white"  style={{marginLeft: 15}} />
                  </TouchableOpacity>
                  
                  <Text style={{
                     color: 'white',
                     fontSize: 20,
                     marginLeft: 15,
                  }}>Nấu ăn</Text>
               </View>
            </View>
            
            <View style={{
                  height: height-120,
                  marginTop: -40,
            }}>
               <ScrollView style={{
                  backgroundColor: 'white',
                  marginHorizontal: 10,
                  borderRadius: 10,
                  // borderWidth: 1,

                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
               >

                  <View style={{
                     marginTop: 10,
                     marginHorizontal: 20
                  }}>
                     <Text style={{ 
                        color: 'gray',
                        marginBottom: 3,
                        fontSize: 11
                     }}>
                        NƠI LÀM VIỆC
                     </Text>
                     <TextInput
                        style={{
                           height: 45,
                           borderWidth: 1,
                           borderColor: '#228B22',
                           borderRadius: 5,
                           paddingHorizontal: 10
                        }} 
                        placeholder={'Địa chỉ đã chọn'}
                     ></TextInput>
                  </View>

                  <View style={{
                     marginTop: 10,
                     marginHorizontal: 20
                  }}>
                     <Text style={{ 
                        color: 'gray',
                        marginBottom: 3,
                        fontSize: 11
                     }}>
                        SỐ NHÀ
                     </Text>
                     <TextInput
                        style={{
                           height: 45,
                           borderWidth: 1,
                           borderColor: '#228B22',
                           borderRadius: 5,
                           paddingHorizontal: 10
                        }} 
                        placeholder={'Địa chỉ đã chọn'}
                     ></TextInput>
                  </View>

                  <View style={{
                     marginTop: 10,
                     marginHorizontal: 20
                  }} >
                     <Text style={{ 
                        color: 'gray',
                        marginBottom: 3,
                        fontSize: 11
                     }}>
                        THÔNG TIN BỮA ĂN
                     </Text>  
                     <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        alignItems: 'center'
                     }}>
                        <Text style={{ 
                           marginRight: 50,
                           color: 'black',
                           fontSize: 13
                        }}>Số người ăn</Text>

                        <TextInput style={{borderWidth:1}}>3</TextInput>
                     </View>
                     
                     <View style={{
                        marginTop: 10
                       
                     }}>
                        <View style={{
                           flexDirection: 'row',
                           alignItems: 'center'
                        }}>
                           <Text style={{ 
                               width: 115,
                              color: 'black',
                              fontSize: 13
                           }}>Số món ăn</Text>
                           <View>
                              <RadioButton
                                 selectedOption={selectedOption}
                                 onSelect={onSelect}
                                 options={quantum}
                              />
                           </View>
                        </View>
                        
                        {
                           selectedOption.text === '2' ? 
                           (
                              <View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 12 }} >Món 1</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 12 }} >Món 2</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                              </View>
                           )
                           : selectedOption.text === '3' ?
                           (
                              <View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 1</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 2</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 3</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                              </View>
                           )
                           : selectedOption.text === '4' &&
                           (
                              <View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 1</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 2</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>

                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 3</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                                 <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 115,
                                    marginTop: 20,
                                    alignItems:'center'
                                 }}>
                                    <Text style={{ color: 'black', fontSize: 13 }} >Món 4</Text>
                                    <TextInput
                                       style={{
                                          flex:1,
                                          marginLeft: 10,
                                          paddingHorizontal: 10,
                                          borderBottomWidth: 1,
                                          borderBottomColor: 'gray',
                                       }}
                                       placeholder={'Nhập tên món ăn'}
                                    >
                                    </TextInput>
                                    
                                 </View>
                              </View>
                           )
                        }
                     </View> 
                  </View>

                  <View style={{
                     flexDirection: 'row',
                     marginTop: 20
                  }}>
                     <View style={{
                        width: '40%',
                        marginTop: 10,
                        marginHorizontal: 20,
                        
                     }}>
                        <Text style={{ 
                           color: 'gray',
                           marginBottom: 3,
                           fontSize: 11
                        }}>
                           NGÀY ĂN
                        </Text>
                        <TextInput
                           style={{
                              height: 45,
                              borderWidth: 1,
                              borderColor: '#228B22',
                              borderRadius: 5,
                              paddingHorizontal: 10
                           }} 
                           placeholder={'Địa chỉ đã chọn'}
                        ></TextInput>
                     </View>

                     <View style={{
                        width: '40%',
                        marginTop: 10,
                        marginHorizontal: 20
                     }}>
                        <Text style={{ 
                           color: 'gray',
                           marginBottom: 3,
                           fontSize: 11
                        }}>
                           THỜI GIAN
                        </Text>
                        <TextInput
                           style={{
                              height: 45,
                              borderWidth: 1,
                              borderColor: '#228B22',
                              borderRadius: 5,
                              paddingHorizontal: 10
                           }} 
                           placeholder={'Địa chỉ đã chọn'}
                        ></TextInput>
                     </View>
                  </View>
     {/* ------------              */}
                  <View style={{
                     // marginTop: 10,
                     marginHorizontal: 20
                  }} >
                      <View style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: 'center'
                     }}>
                        <Text style={{ 
                           width: 115,
                           color: 'black',
                           fontSize: 13
                        }}>Trái cây</Text>
                        <View>
                           <RadioButton
                              selectedOption={selectedFruit}
                              onSelect={onSelectfruit}
                              options={fruits}
                           />
                        </View>
                     </View>     

                     <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                     }}>
                        <Text style={{ 
                           width: 115,
                           // marginRight: 70,
                           color: 'black',
                           fontSize: 13
                        }}>Đi chợ</Text>
                        <View>
                           <RadioButton
                              selectedOption={selectedGo}
                              onSelect={onSelectGo}
                              options={go}
                           />
                        </View>
                     </View>   
                  </View>  
      {/* ------------------       */}
                  <View >
                     <View style={{
                        marginTop: 20,
                        marginHorizontal: 20,
                        marginBottom: 20     
                     }}>
                        <Text style={{ 
                           color: 'gray',
                           marginBottom: 3,
                           fontSize: 11
                        }}>
                          MÃ GIẢM GIÁ
                        </Text>
                        <View style={{
                           flexDirection: 'row',
                           alignItems: 'center'
                        }}>
                           <TextInput
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
                           <TouchableOpacity>
                              <Text style={{ marginLeft: 20, color: 'red', fontSize: 18, fontWeight: 'bold'}} >Áp dụng</Text>
                           </TouchableOpacity>
                           
                        </View>

                        <View style={{
                           marginTop: 25
                        }}>   
                           <View style={{
                              flexDirection: 'row'
                           }}>
                              <Text style={{ fontSize: 16,  flex: 1}} >Chọn người làm</Text>
                              <Switch
                                 trackColor={{ false: "#767577", true: "#043927" }}
                                 thumbColor={isEnabled ? "#228B22" : "#f4f3f4"}
                                 ios_backgroundColor="#3e3e3e"
                                 onValueChange={toggleSwitch}
                                 value={isEnabled}
                              />
                           </View>
                             
                        </View>

                     </View>
                  </View>
               </ScrollView>


               <TouchableOpacity>
                  <View style={{
                     position: 'relative',
                     marginHorizontal: 25,
                     borderRadius: 10,
                     height: 50,
                     marginTop: 10,
                     // marginBottom: 10, 
                     backgroundColor: 'rgb(46, 139, 87)',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}>
                     <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold'}}>Đặt</Text>
                  </View>
               </TouchableOpacity>
            </View>

            
         </View>
   )
}

export default CookingScreen;


