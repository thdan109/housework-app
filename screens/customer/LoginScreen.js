import React from 'react';
import Constants from 'expo-constants';
import { View, Image, Dimensions, Animated , Easing, Text, TextInput, CheckBox, AsyncStorage, Alert, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles/styleLogin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import * as Notifications from 'expo-notifications';
// import * as Notifications from 'expo-no'

import axios from 'axios';
import host from '../../host';

import { addUser } from '../../action/user';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const { width,height }  = Dimensions.get("screen");

const LoginScreen = ({navigation}) => {
   const dispatch = useDispatch();
   const user = useSelector(state => state)
   const [expoPushToken, setExpoPushToken] = React.useState();

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
      // (async () => {
      //    const token_vale = await AsyncStorage.getItem('token');
      //    // console.log();
         
      //  })();
      //  console.log(AsyncStorage.getItem('token'));
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

   React.useEffect(() => {
      // AnimateContainer();
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

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

   
   const registerForPushNotificationsAsync = async() =>{
      let token
      if (Constants.isDevice) {
         const { status: existingStatus } = await Notifications.getPermissionsAsync();
         let finalStatus = existingStatus;
         if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
         }
         if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
         }
         token = (await Notifications.getExpoPushTokenAsync()).data;
         console.log(token);
      } else {
         alert('Must use physical device for Push Notifications');
      }
       return token;
   }
   
   const loginUser = async () =>{
      const user = await axios.post(`${host}/user/login`,{
         usernameCus: data.username,
         passwordCus: data.password,
         tokenDevice: expoPushToken 
      })
      // console.log(user.data.user);
      // console.log(user.data);
      if (user.data.user){
         await AsyncStorage.setItem('Token', user.data.token)
         dispatch(addUser(user.data.user))
         navigation.replace('Home')
      }else if (!user.data.user){
         return Alert.alert(
            'Th??ng b??o!',
            "M???t kh???u ho???c t??n ????ng nh???p sai!"
         )
      }
     
      
      
   }



   return(
      <Animated.View style={[ styles.container,  Animatedcontainer ]}>
         <StatusBar/>
            <LinearGradient colors={[ "#043927","#043927" ]} style={[ styles.container, styles.centerAlign ]}>
               <Image source={require('../../assets/logo4.png')} style={styles.logo} />
         </LinearGradient>
         <View style={[ styles.centerAlign, { marginTop: 2, backgroundColor: 'rgba(210,210,210,0.9)', height: height }]}>
            <Animated.View style={[ styles.inputContainer,  AnimatedInput] } >
         <Text style={{ fontSize: 20, fontWeight: "bold", textAlign:'center'}}>????NG NH???P</Text>
               <View style={{ marginTop: 30, marginBottom: 10  }} > 
                  <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray' ,height: 55}}>
                     <MaterialCommunityIcons name="account" color="#696969" size={30} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10 }} />
                     <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextInput  
                                    // onFocus={() =>  AnimateInput() } 
                                    // onBlur={()=> reverseAnimateInput() }
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
                                    // onFocus={() =>  AnimateInput() } 
                                    // onBlur={()=> reverseAnimateInput() }
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
               {/* <View style={{ flexDirection: 'row'}}>
                  <View style={{ flex: 0.5, alignItems: 'center', flexDirection: 'row' }}>
                     <CheckBox  style={{ width: 20, height: 20, marginRight: 10, borderColor: 'rgba(200,200,200,0.5)' }} />
                     <Text style={{ fontStyle: 'italic' }}>Ghi nh??? m???t kh???u</Text>
                  </View>
                  <View style={{ flex: 0.5, alignItems: 'flex-end'}}>
                     <TouchableOpacity>
                        <Text style={{ color: "red"}}>Qu??n m???t kh???u</Text>
                     </TouchableOpacity>
                  </View>
               </View> */}
               {/* <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <TouchableOpacity  >
                     <LinearGradient style={{ width: width / 1.35, padding: 10, borderRadius: 20}}  colors={[ "#FFB75E","#ED8F03" ]}>
                        <Text onPress={loginUser} style={{ color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Sign up</Text>
                     </LinearGradient>
                  </TouchableOpacity>
               </View> */}

               {/* test */}

               <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <TouchableOpacity  >
                     <LinearGradient style={{ width: width / 1.35, padding: 10, borderRadius: 20}}  colors={[ "#043927","#043927" ]}>
                        {/* <Text onPress={loginUser} style={{ color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Sign up</Text> */}
                        <Text onPress={()=>{loginUser()
                                          // (status.status === true)?
                                          // (
                                          //    navigation.navigate('Home')
                                          // ):
                                          // (
                                          //    Alert.alert(" No!")
                                          // )
                                       }} style={{ color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>????ng nh???p</Text>
                     </LinearGradient>
                  </TouchableOpacity>
               </View>

               {/* end test */}
               <View style={{ justifyContent: "center", alignItems: 'center', flexDirection: "row", marginVertical: 10 }}>
                  {/* <Text style={{ textAlign: 'center', color: "#888"}}>Still Not Connected?</Text> */}
                  <TouchableOpacity style={{ marginLeft: 5 }}>
                     <Text onPress={()=>navigation.navigate('Signup')} >????ng k??</Text>        
                  </TouchableOpacity>
               </View>
               <View style={{ justifyContent: "center", alignItems: 'center', flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity style={{ marginLeft: 5 }}>
                     <Text onPress={()=>navigation.navigate('LoginStaff')} >For Staff</Text>        
                  </TouchableOpacity>
               </View>
            </Animated.View >
         </View>
      </Animated.View>
         
   )    
}

export default LoginScreen;
