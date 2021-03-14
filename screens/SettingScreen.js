import React from 'react';
import { View, Image, Dimensions, Animated , Easing, Text, TextInput, CheckBox, AsyncStorage, Alert, StatusBar, ViewBase} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styleLogin';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Ionicons, Entypo , Feather} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


import axios from 'axios';
import host from '../host';

import { addUser } from '../action/user';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const { width,height }  = Dimensions.get("screen");

const SettingScreen = ({navigation}) => {
   const dispatch = useDispatch();

   const user = useSelector(state => state)
   const [data, setData] = React.useState(
      {
         username: '',
         password: ''
      }
   )
   const screenAnimation = React.useRef(new Animated.Value(height)).current;
   const inputAnimation = React.useRef(new Animated.Value(0)).current
   
   const AnimateContainer = () =>{
      Animated.timing(screenAnimation, {
         toValue: height,
         duration: 1000,
         easing: Easing.elastic(1.3),
         useNativeDriver:false   
      }).start();
   };
   const AnimateInput = () =>{
      Animated.timing(inputAnimation, {
         toValue: -height / 5,
         duration: 600,
         useNativeDriver:true
      }).start();
   }
   const reverseAnimateInput = () =>{
      Animated.timing(inputAnimation, {
         toValue: 0,
         duration: 600,
         useNativeDriver:true
      }).start();
   }

   React.useEffect(() => {
      AnimateContainer();
   },[])
   
   const Animatedcontainer = {
      height: screenAnimation,
   }

   const AnimatedInput = {
      transform : [
         {translateY: inputAnimation}
      ]
   }

  
   const handleChangeUsername = (val) =>{
      setData({
         ...data,
         username: val,
      })
   }
   const handleChangePassword = (val) =>{
      setData({
         ...data,
         password: val
      })
   }
   
   const loginUser = async () =>{
      // console.log('login');
      const user = await axios.post(`${host}/user/login`,{
         usernameCus: data.username,
         passwordCus: data.password
      })

      await AsyncStorage.setItem('Login', user.data._id)
      dispatch(addUser(user.data))
      navigation.replace('Home');
   }

      return(
         <Animated.View style={[ styles.container,  Animatedcontainer ]}>
              <View style={{
         // flex: 1,
         width: "100%",
         height: "100%",
      }}>
         <StatusBar backgroundColor='black'/>
         <View style={{
            flex: 1,
            // width: width,
            // hieght: hieght,
            backgroundColor: 'green',
         }}>
            <TextInput placeholder={'assasaa'} ></TextInput>
            <View style={{
                  flex: 1/19,
                  flexDirection: 'row',
                  backgroundColor: 'rgb(230,230,230)',
                  justifyContent:"center",
                  alignItems: 'center'
            }}> 
               <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                  <View style={{
                     marginLeft: 10
                  }}>
                     <Feather name="chevron-left" size={34} color="#043927" />
                  </View>
               </TouchableOpacity>

               <View style={{
                  flex: 1,
                  alignItems: 'center'
               }}>
                  <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Cập nhật hồ sơ</Text>
               </View>

               <View style={{
                  marginRight: 15,
                  opacity: 1
               }}>
                 <Feather name="check" size={34} color="black" />
               </View>
            </View>

   {/* Sửa đổi ảnh đại diện */}
            <View style={{
               flex: 1,
               justifyContent: 'center'
            }}>
               <View style={{
                  flex: 1,
                  backgroundColor: 'rgba(210,210,210,1)'
               }}>
                  
                  <View style={{ flex:1/4, backgroundColor: "#043927", justifyContent: "center", alignItems: 'center'}}>
                     <View style={{
                        flex: 2.5/4,
                        width: 115,
                        borderRadius: 80,
                        backgroundColor: 'yellow'
                     }}>
                     </View>
                  </View>
      {/* Kết thúc sửa ảnh */}
      {/* Sửa đổi thông tin */}
                  <View style={{
                     flex: 1/8,
                     backgroundColor: 'white',
                     marginBottom: 20,
                  }}>
                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Tên đăng nhập</Text>
                        <Text style={{

                        }}>{user.users.data.username}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" style={{opacity: 0}} />
                        </TouchableOpacity>
                     </View>

                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                        
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Số CMND</Text>
                        <Text style={{

                        }}>{user.users.data.IDCard}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                  </View>

                  <View style={{
                     flex: 1/2.5,
                     backgroundColor: 'white',
                     marginBottom: 20
                  }}> 
                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                        
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Họ và tên</Text>
                        <Text style={{

                        }}>{user.users.data.fullname}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>

                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Số điện thoại</Text>
                        <Text style={{

                        }}>{user.users.data.phone}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                        
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Email</Text>
                        <Text style={{

                        }}>{user.users.data.email}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                        
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Địa chỉ</Text>
                        <Text style={{

                        }}>{user.users.data.address}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                        
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Ngày sinh</Text>
                        <Text style={{

                        }}>{user.users.data.birthday}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                     <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(200,200,200,0.9)',
                        flex: 1/2,
                        alignItems:'center',
                        paddingBottom: 3,
                        
                     }}>
                        <Text style={{
                           flex: 1,
                           // fontWeight: 'bold',
                           marginHorizontal: 5,
                           fontSize: 16   
                        }}>Giới tính</Text>
                        <Text style={{

                        }}>{user.users.data.sex}</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View style={{
                     flex: 1/14,
                     backgroundColor: 'white',
                     marginBottom: 20
                  }}>
                     <View 
                        style={{
                           flexDirection: 'row',
                           borderBottomWidth: 1,
                           borderBottomColor: 'rgba(200,200,200,0.9)',
                           flex: 1,
                           alignItems:'center',
                           paddingBottom: 3,
                     }}>
                        <Text 
                           style={{
                            flex: 1,
                           //  fontWeight: 'bold',
                            marginHorizontal: 5,
                            fontSize: 16 
                        }}>Đổi mật khẩu</Text>
                        <TouchableOpacity style={{ marginHorizontal: 10}}>
                           <Ionicons name="chevron-forward-outline" size={22} color="#043927" />
                        </TouchableOpacity>
                     </View>
                     <TextInput placeholder='aaaa'></TextInput>
                  </View>
               </View>            
            </View>
         </View>
      </View>
{/*             
            <StatusBar/>
             <LinearGradient colors={[ "#043927","#043927" ]} style={[ styles.container, styles.centerAlign ]}>
                  <Image source={require('../assets/logo4.png')} style={styles.logo} />
            </LinearGradient>
            <View style={[ styles.centerAlign, { marginTop: 2, backgroundColor: 'rgba(210,210,210,0.9)', height: height }]}>
               <Animated.View style={[ styles.inputContainer,  AnimatedInput] } >
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign:'center'}}>ĐĂNG NHẬP</Text>
                  <View style={{ marginTop: 30, marginBottom: 10  }} > 
                     <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray' ,height: 55}}>
                        <MaterialCommunityIcons name="account" color="#696969" size={30} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10 }} />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                           <TextInput  
                                       
                                       value={data.username}
                                       placeholder='Username' 
                                       style={{ flex: 1 , fontSize: 18 }} 
                                       onChangeText={(val) => handleChangeUsername(val)}
                           />    
                        </View>
                        <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                     </View>
                     <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,height: 55, marginVertical: 20, borderColor: 'gray' }}>
                        <MaterialCommunityIcons name="onepassword" color="#696969" size={30} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10 }} />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                           <TextInput  
                                      
                                       value={data.password}
                                       secureTextEntry={true}
                                       placeholder='Password' 
                                       style={{ flex: 1 , fontSize: 18 }} 
                                       onChangeText={(val) => handleChangePassword(val)}
                           />    
                        </View>
                        <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                     </View>
                  </View>
                  <View style={{ flexDirection: 'row'}}>
                     <View style={{ flex: 0.5, alignItems: 'center', flexDirection: 'row' }}>
                        <CheckBox  style={{ width: 20, height: 20, marginRight: 10, borderColor: 'rgba(200,200,200,0.5)' }} />
                        <Text style={{ fontStyle: 'italic' }}>Ghi nhớ mật khẩu</Text>
                     </View>
                     <View style={{ flex: 0.5, alignItems: 'flex-end'}}>
                        <TouchableOpacity>
                           <Text style={{ color: "red"}}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
                 

                  <View style={{ marginTop: 10, alignItems: 'center' }}>
                     <TouchableOpacity  >
                        <LinearGradient style={{ width: width / 1.35, padding: 10, borderRadius: 20}}  colors={[ "#043927","#043927" ]}>
                       
                           <Text onPress={()=>{loginUser()}} style={{ color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Đăng nhập</Text>
                        </LinearGradient>
                     </TouchableOpacity>
                  </View>

                 
                  <View style={{ justifyContent: "center", alignItems: 'center', flexDirection: "row", marginVertical: 10 }}>
                   
                     <TouchableOpacity style={{ marginLeft: 5 }}>
                        <Text onPress={()=>navigation.navigate('Signup')} >Đăng ký</Text>        
                     </TouchableOpacity>
                  </View>
               </Animated.View >
            </View>
           */}
           {/* <TextInput placeholder='aaaaa'></TextInput> */}
           <View style={{
              backgroundColor: 'yellow',
              height: "100%",
              width: "100%"
           }} >
              <TextInput placeholder="aaaa"></TextInput>
              <View style={{width: width, height: height/6,  position: 'absolute', bottom: 0}}>
                  <Text>asdas</Text>
              </View>
           </View>
          </Animated.View>
           
      )    
}

export default SettingScreen;
