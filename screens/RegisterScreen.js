import React from 'react';
import { View, Dimensions, Animated , Easing, Text, TextInput,  ScrollView, StatusBar, TouchableOpacity, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons, Entypo, AntDesign, Fontisto } from 'react-native-vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
// import DatePicker from 'react-native-datepicker';
import { ModalDatePicker } from "react-native-material-date-picker";
import Moment from 'moment';


import axios from 'axios';
import host from '../host';

import { addUser } from '../action/user';


const { width,height }  = Dimensions.get("screen");

const RegisterScreen = ({navigation}) => {
   const dispatch = useDispatch();

   const [status, setStatus] = React.useState({status: true})
   const user = useSelector(state => state)
   const [data, setData] =React.useState(
      {
         username: null,
         password: null,
         repassword: null,
         fullname: null,
         phone: null,
         email: null,
         address: null,
         gender: null,
         calendar:null,
         idcard: null

      }
   )
   const [validate, setValidate] = React.useState(
      {
         valiusername: '',
         valipassword: '',
         valirepassword: '',
         valifullname: '',
         valiemail: '',
         valiaddress: '',
         valigender: '',
         valicalendar:'',
         valiidcard: ''
      }
   )
   const [datee, setdate] = React.useState(new Date())
   const screenAnimation = React.useRef(new Animated.Value(height)).current;
   const inputAnimation = React.useRef(new Animated.Value(0)).current
   
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
      AnimateContainer();
      Signin();
   },[])
   
   const Animatedcontainer = {
      height: screenAnimation,
   }

   const AnimatedInput = {
      transform : [
         {translateY: inputAnimation}
      ]
   }
   const handleUsername = (val) =>{
      setData({
         ...data,
         username: val
      })
      if (val.length < 8){
         setValidate({
            ...validate,
            valiusername: false
         })
      }else{
         setValidate({
            ...validate,
            valiusername: true
         })
      }
   }
   const handlePassword = (val) =>{
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
      setData({
         ...data,
         password: val
      })
      if (!regex.test(val)){
         setValidate({
            ...validate,
            valipassword: false
         })
      }else{
         setValidate({
            ...validate,
            valipassword: true
         })
      }
   }
   const handleRepassword = (val) =>{
      setData({
         ...data,
         repassword: val
      })
      if (val.length - data.password.length === 0){
         if (val === data.password){
            setValidate({
               ...validate,
               valirepassword: true
            })
         }
      }else{
         setValidate({
            ...validate,
            valirepassword: false
         })
      }
   }
   const handleFullname = (val) =>{
      setData({
         ...data,
         fullname: val
      })
   }
   const handlePhone = (val) =>{
      setData({
         ...data,
         phone: val
      })
   }
   const handleEmail = (val) =>{
      setData({
         ...data,
         email: val
      })
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
      if (!regex.test(val)){
         setValidate({
            ...validate,
            valiemail: false
         })
      }else{
         setValidate({
            ...validate,
            valiemail: true
         })
      }
   }
   const handleAddress = (val) =>{
      setData({
         ...data,
         address: val
      })
   }
   const handleGender = (val) =>{
      if (val === 0){
         setData({
            ...data,
            gender: 'Nam'
         })
      }else if(val === 1){
         setData({
            ...data,
            gender: 'Nữ'
         })
      }else{
         setData({
            ...data,
            gender: "Giới tính khác"
         })
      }
   }
   const handleCalendar = (val) =>{
      setData({
         ...data,
         calendar: val
      })
   }
   const handleIdcard = (val) =>{
      setData({
         ...data,
         idcard: val
      })
      const regex = /[0-9]/

      if (!regex.test(val)){
         setValidate({
            ...validate,
            valiidcard: false
         })
      }else{
         setValidate({
            ...validate,
            valiidcard: true
         })
      }
   }
  


   const Signin = () =>{
      // console.log(data.username.length, data.password,data.address,data.repassword, data.email,data.fullname,data.idcard,datee, data.gender);
      if ( (data.username !== null) && (data.password !== null) && (data.address !== null) && (data.email !== null) && (data.fullname !== null) && (data.idcard !== null) && (data.gender !== null) && (data.repassword !== null)){
         axios.post(`${host}/user/register`,{
            username: data.username,
            password: data.password,
            repassword: data.repassword,
            address: data.address,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            fullname:  data.fullname,
            idcard: data.idcard,
            birthday: datee
         }).then(res =>{
            // console.log(status.status); 
            if (res.status === 201   ){
               return navigation.navigate('Login')  
            }
         }).catch(err =>{
            // console.log('Gửi thất bại!'+err);
          if (err){
             return   Alert.alert('No!')
          }
         })
         // setStatus({
         //    ...status,
         //    status: true
         // })
        

      }else{
         // setStatus(false)
         // setStatus({
         //    ...status,
         //    status: false
         // })
         return Alert.alert('Dien Di')
      }  
      
   }
  

      return(
         <Animated.View >
            <StatusBar />            
            <View style={{
               width: '100%',
               height: "100%",
               borderWidth: 1,
               backgroundColor: 'rgba(220,220,220,0.9)'
            }}>
               <View style={{
                  flex: 0.75/7,
                  // borderWidth: 1,
                  backgroundColor: '#043927',
                  
               }}>
              
               </View>
               <View style={{
                  flex:6.5/7,
                  backgroundColor: "white", 
                  marginHorizontal: 15,
                  marginTop: -30,
                  marginBottom: 20,
                  borderRadius: 30,
                  // borderWidth:1
               }}>

                  <ScrollView    showsVerticalScrollIndicator={false}
                                 showsHorizontalScrollIndicator={false}
                  >
                     <View style={{flex: 1, alignItems: "center", borderWidth: 0, marginTop: 10, paddingVertical: 10}}>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>ĐĂNG KÝ</Text>
                     </View>
                     <View style={{
                        flex: 1,
                        marginVertical: 0,
                        marginHorizontal: 15,
                        height: height / 1.25,
                     }} >
                     <View style={{ marginBottom: 0}}>
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray', height:50, alignItems: 'center',}}>
                           <MaterialCommunityIcons name="account" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <TextInput  
                                          value={data.username}
                                          placeholder='Tên tài khoản' 
                                          style={{ flex: 1 , fontSize: 18 }} 
                                          onChangeText={(val) => handleUsername(val)}
                              /> 
                           </View>
                           <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        {
                           (validate.valiusername === false)
                           ?
                           <Animated.View>
                              <Text style={{color: 'red', fontSize: 11, marginLeft: 78}}>Tên đăng nhập phải trên 8 kí tự!</Text>
                           </Animated.View>
                           :
                           <Animated.View>
                              <Text style={{opacity:0, fontSize: 11}}></Text>
                           </Animated.View>

                        }   
                     </View>  
                        
                     <View>
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray', height:50, alignItems: 'center' }}>
                              <MaterialCommunityIcons name="onepassword" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                              <View style={{ flex: 1, marginHorizontal: 15 }}>
                                 <TextInput  
                                             value={data.password}
                                             secureTextEntry={true}
                                             placeholder='Mật khẩu' 
                                             style={{ flex: 1 , fontSize: 18 }} 
                                             onChangeText={(val) => handlePassword(val)}
                                 />    
                              </View>
                              <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                           </View>
                           {
                              (validate.valipassword === false)
                              ?
                              <Animated.View>
                                 <Text style={{color: 'red', fontSize: 11, marginLeft: 78}}>Tối thiểu 8 ký tự, ít nhất một chữ cái và một số!</Text>
                              </Animated.View>
                              :
                              <Animated.View>
                                 <Text style={{opacity:0, fontSize: 11}}></Text>
                              </Animated.View>

                           }   
                     </View>   
                        
                     <View style={{ marginBottom: 0}}>
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray', height:50, alignItems: 'center' }}>
                           <MaterialCommunityIcons name="onepassword" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <TextInput  
                                          value={data.repassword}
                                          secureTextEntry={true}
                                          placeholder='nhập lại mật khẩu' 
                                          style={{ flex: 1 , fontSize: 18 }} 
                                          onChangeText={(val) => handleRepassword(val)}
                              />    
                           </View>
                           <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        {
                           (validate.valirepassword === false)
                           ?
                           <Animated.View>
                              <Text style={{color: 'red', fontSize: 11, marginLeft: 78}}>Nhập lại mật khẩu khớp!</Text>
                           </Animated.View>
                           :
                           <Animated.View>
                              <Text style={{opacity:0, fontSize: 11}}></Text>
                           </Animated.View>

                        }   
                     </View>     
                       
                        
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30, marginBottom: 15,borderColor: 'gray', height:50, alignItems: 'center' }}>
                           <MaterialCommunityIcons name="information-variant" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <TextInput  
                                         value={data.fullname}
                                          placeholder='Họ và tên' 
                                          style={{ flex: 1 , fontSize: 18 }} 
                                          onChangeText={(val) => handleFullname(val)}
                                          // value={fullname}
                              />    
                           </View>
                           <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        
                        <View style={{ marginBottom: 0}}>
                           <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray', height:50, alignItems: 'center' }}>
                              <MaterialCommunityIcons name="email" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                              <View style={{ flex: 1,marginHorizontal: 15 }}>
                                 <TextInput  
                                             value={data.email}
                                             placeholder='Email' 
                                             style={{ flex: 1 , fontSize: 18 }} 
                                             onChangeText={(val) => handleEmail(val)}
                                 />    
                              </View>
                              <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                           </View>
                        {
                           (validate.valiemail === false)
                           ?
                           <Animated.View>
                              <Text style={{color: 'red', fontSize: 11, marginLeft: 78}}>Email sai!</Text>
                           </Animated.View>
                           :
                           <Animated.View>
                              <Text style={{opacity:0, fontSize: 11}}></Text>
                           </Animated.View>

                        }   
                     </View>  
                        
                     <View style={{ marginBottom: 0}}>
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray', height:50, alignItems: 'center' , marginBottom: 15}}>
                           <MaterialCommunityIcons name="phone" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <TextInput  
                                          value={data.phone}
                                          keyboardType='number-pad'
                                          placeholder='Nhập số điện thoại' 
                                          style={{ flex: 1 , fontSize: 18 }} 
                                          onChangeText={(val) => handlePhone(val)}
                              />    
                           </View>
                           <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        {/* {
                           (validate.valirepassword === false)
                           ?
                           <Animated.View>
                              <Text style={{color: 'red', fontSize: 11, marginLeft: 78}}>Nhập lại mật khẩu khớp!</Text>
                           </Animated.View>
                           :
                           <Animated.View>
                              <Text style={{opacity:0, fontSize: 11}}></Text>
                           </Animated.View>

                        }    */}
                     </View>     

                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30, marginBottom: 15,borderColor: 'gray', height:50, alignItems: 'center' }}>
                           <Entypo name="address" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <TextInput  
                                          placeholder='Địa chỉ' 
                                          style={{ flex: 1 , fontSize: 18 }} 
                                          onChangeText={(val) => handleAddress(val)}
                              />    
                           </View>
                           <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30, marginBottom: 15,borderColor: 'gray', height:50, alignItems: 'center' }}>
                           <MaterialCommunityIcons name="gender-transgender" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <ModalDropdown value={data.gender} onSelect={(val)=>handleGender(val)} textStyle={{fontSize: 18}} defaultValue="Vui lòng chọn một"  options={['Nam', 'Nữ', 'Giới tính khác']} dropdownStyle={{width: 250, height: 120, borderWidth: 2}} dropdownTextStyle={{fontSize: 16}}>
                              </ModalDropdown>
                              
                           </View>
                           <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        
                        <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30, marginBottom: 15,borderColor: 'gray', height:50, alignItems: 'center' }}>
                           <Fontisto name="date" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                           <View style={{ flex: 1, marginHorizontal: 15 }}>
                              <ModalDatePicker 
                                 locale="en" 
                                 onSelect={(date) => {setdate(date)} }
                                 isHideOnSelect={true}
                                 initialDate={new Date()}
                                 button={<Text style={{fontSize: 17}}>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>}
                              />     
                           </View>
                           <MaterialCommunityIcons name="account" color="#043927" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                        </View>
                        <View style={{ marginBottom: 0}}>
                           <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 30,borderColor: 'gray', height:50, alignItems: 'center' }}>
                              <AntDesign name="idcard" color="#043927" size={30} style={{ marginVertical: 10, marginLeft: 20, marginRight: 10 }} />
                              <View style={{ flex: 1, marginHorizontal: 15 }}>
                                 <TextInput  
                                 
                                             // onFocus={() =>  AnimateInput() } 
                                             // onBlur={()=> reverseAnimateInput() }
                                             keyboardType="numeric"
                                             placeholder='Số chứng minh thư' 
                                             style={{ flex: 1 , fontSize: 18 }} 
                                             onChangeText={(val) => handleIdcard(val)}
                                 />    
                              </View>
                              <MaterialCommunityIcons name="account" size={35} style={{ marginVertical: 10, marginLeft: 10, marginRight: 10, opacity: 0 }} />
                           </View>
                           {
                              (validate.valiidcard === false)
                              ?
                              <Animated.View>
                                 <Text style={{color: 'red', fontSize: 11, marginLeft: 78}}>Vui lòng nhập đúng số chứng minh thư!</Text>
                              </Animated.View>
                              :
                              <Animated.View>
                                 <Text style={{opacity:0, fontSize: 11}}></Text>
                              </Animated.View>

                           }   
                        </View>  
                     </View>
                  </ScrollView>
               </View>
               <View style={{flexDirection: 'column', justifyContent:'center'}}>
                  <View style={{ marginTop: 0, alignItems: 'center', marginBottom: 10}}>
                     <TouchableOpacity  >
                        <LinearGradient style={{ width: width / 1.1, padding: 10, borderRadius: 20, marginHorizontal: 15}}  colors={[ "#043927","#043927" ]}>
                           <Text onPress={
                                             ()=>{
                                                Signin();
                                                // (status.status === true )?
                                                // (
                                                //    navigation.navigate('Login')
                                                // ):
                                                // (
                                                //    Alert.alert('Đăng ký thất bại!')
                                                // )
                                             }
                                             
                                          } 
                                 style={{ 
                                          color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' 
                                 }}
                           >
                              Đăng ký
                           </Text>
                        </LinearGradient>
                     </TouchableOpacity>  
                  </View>
                  <View style={{ marginTop: 0, alignItems: 'center', marginBottom: 10 }}>
                     <TouchableOpacity  >
                        {/* <LinearGradient style={{ width: width / 2.5, padding: 10, borderRadius: 20, marginHorizontal: 15}}  colors={[ "#043927","#043927" ]}> */}
                           <Text onPress={()=> navigation.navigate('Login')} style={{ color: "black", textAlign: 'center', fontSize: 16, fontWeight: '100' }}>Đăng nhập</Text>
                        {/* </LinearGradient> */}
                     </TouchableOpacity>  
                  </View>
                  
                  
                   
                  
               </View>
            </View>


         </Animated.View>
      )    
}

export default RegisterScreen;
