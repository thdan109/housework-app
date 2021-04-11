import React from 'react';
import { View, Image, Dimensions, Animated , Easing, Text, TextInput, CheckBox, AsyncStorage, Alert, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles/styleLogin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import axios from 'axios';
import host from '../../host';

import { addUser } from '../../action/user';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const { width,height }  = Dimensions.get("screen");

const LoginStaffScreen = ({navigation}) => {
   const dispatch = useDispatch();
   const user = useSelector(state => state)

   const [data, setData] = React.useState(
      {
         username: '',
         password: ''
      }
   )
   const screenAnimation = React.useRef(new Animated.Value(height)).current;
   const inputAnimation = React.useRef(new Animated.Value(0)).current;

   React.useEffect(() => {
      AnimateContainer();
    }, []);
   
   const AnimateContainer = () =>{
      Animated.timing(screenAnimation, {
         toValue: height / 3,
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
   
   const loginStaff = async () =>{
      // const staff = await axios.post(`${host}/staff/login`,{
      //    usernameStaff: data.usernameStaff,
      //    passwordStaff: data.passwordStaff,
      // })

      // await AsyncStorage.setItem('Token', staff.data.token)
      // dispatch(addUser(user.data.user))
      // navigation.replace('Home')
   }

      return(
         <Animated.View style={[ styles.container,  Animatedcontainer ]}>
            <StatusBar/>
             <LinearGradient colors={[ "#D2691E","#D2691E" ]} style={[ styles.container, styles.centerAlign ]}>
                  <Image source={require('../../assets/logo4.png')} style={styles.logo} />
            </LinearGradient>
            <View style={[ styles.centerAlign, { marginTop: 2, backgroundColor: 'rgba(210,210,210,0.9)', height: height }]}>
               <Animated.View style={[ styles.inputContainer,  AnimatedInput] } >
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign:'center'}}>ĐĂNG NHẬP NHÂN VIÊN</Text>
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
                     {/* <View style={{ flex: 0.5, alignItems: 'center', flexDirection: 'row' }}>
                        <CheckBox  style={{ width: 20, height: 20, marginRight: 10, borderColor: 'rgba(200,200,200,0.5)' }} />
                        <Text style={{ fontStyle: 'italic' }}>Ghi nhớ mật khẩu</Text>
                     </View> */}
                     {/* <View style={{ flex: 0.5, alignItems: 'flex-end'}}>
                        <TouchableOpacity>
                           <Text style={{ color: "red"}}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                     </View> */}
                  </View>
                  
                  <View style={{ marginTop: 10, alignItems: 'center' }}>
                     <TouchableOpacity  >
                        <LinearGradient style={{ width: width / 1.35, padding: 10, borderRadius: 20}}  colors={[ "#D2691E","#D2691E" ]}>
                           <Text onPress={()=>{loginUser()}} 
                              style={{ color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' 
                           }}>
                              Đăng nhập
                           </Text>
                        </LinearGradient>
                     </TouchableOpacity>
                  </View>
               </Animated.View >
            </View>
         </Animated.View>
           
      )    
}

export default LoginStaffScreen;
