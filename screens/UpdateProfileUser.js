import React from 'react';
import {View, Text, Dimensions, StatusBar, TouchableOpacity, TextInput, Animated, Image ,Platform ,Easing, Modal, StyleSheet, Pressable, ScrollView, Button, Alert} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons, Entypo , Feather, FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ModalDatePicker } from "react-native-material-date-picker";
import Moment from 'moment'
import axios from 'axios';
import host from '../host';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../action/user';

const { width, height } = Dimensions.get("screen");


const UpddateProfileUser = ({navigation}) =>{
const user =  useSelector( state => state)
const dispatch = useDispatch();

   React.useEffect(() => {
      (async () => {
      if (Platform.OS !== 'web') {
         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
         if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
         }
      }
      })();
   }, []);

   const [image, setImage] = React.useState(null);
   const [imageForm, setImageForm] = React.useState(null);
   const [ status, setStatus] = React.useState(false)

   const [datee, setdate] = React.useState(new Date())
   const [data, setData ] = React.useState({
      fullname: user.users.data.fullname,
      phone: user.users.data.phone,
      email: user.users.data.email,
      address: user.users.data.address,
      gender: user.users.data.sex,
      // calendar:user.users.data.sex,
      idcard: user.users.data.IDCard
   })
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
         valiidcard: '',
         valiphone: ''
      }
   )


   // Animated
   const screenAnimation = React.useRef(new Animated.Value(height)).current;
   const [ id , setId] = React.useState(user.users.data._id)
   const [modalVisible, setModalVisible] = React.useState(false);
   const [modalVisible1, setModalVisible1] = React.useState(false);
   const Animatedcontainer = {
      height: screenAnimation,
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
      const regex = /[0-9]/

         if (!regex.test(val)){
            setValidate({
               ...validate,
               valiphone: false
            })
         }else{
            setValidate({
               ...validate,
               valiphone: true
            })
         }
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

   const Load = () =>{
      setData({
         ...data,
         fullname: user.users.data.fullname,
         phone: user.users.data.phone,
         email: user.users.data.email,
         address: user.users.data.address,
         gender: user.users.data.sex,
         // calendar:user.users.data.sex,
         idcard: user.users.data.IDCard
      })
   }

   const UploadImage = async () =>{
      const localUri = imageForm.uri;
      const filename = localUri.split('/').pop()
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      const dataPicture = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
      const userr = JSON.parse(
         JSON.stringify({
            id : id
         })
       );
      formData.append('photo', dataPicture);
      formData.append('id',id)
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      // console.log(formData,config);
      axios.post(`${host}/user/imageUser`,formData, config).then(res =>{
         // console.log(res.data.avatar);
         console.log('aaa');
         dispatch(addUser({
            ...user.users.data,
            avatar: res.data.avatar
         }))
         // console.log(user.users.data.avatar);
         navigation.replace('UpdateProfileUser');
      }).catch(err =>{

      })
     
      // console.log(user.users.data);

   }

   const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 4],
         quality: 1,
      });

      if (result.cancelled === false) {
         setImage(result.uri);
         setImageForm(result);
         setStatus(true)
      }
    };
   
   

   const UpdateInforUser = ( ) =>{
      // console.log(data.fullname, data.idcard, data.address, data.phone, datee, data.gender);
      if ( validate.valiphone === true && validate.valiemail===true && validate.valiidcard === true ){
         axios.post(`${host}/user/updateinfor`,{
            id: user.users.data._id,
            fullname: data.fullname,
            phone: data.phone,
            email: data.email,
            address:data.address,
            sex: data.gender,
            calendar: datee ,
            idcard: data.IDCard
         })
      }
   
   }


   return(
      <Animated.View style={[ {width: "100%", height: "100%"},  Animatedcontainer ]}>
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
               {/* Modal chọn ảnh */}
                           <View style={{ }}>
                              <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={modalVisible1}
                                  onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible1(!modalVisible1);
                                  }}
                              >
                                 <View style={{flex:1, justifyContent: 'center'}}>
                                    <View style={{ backgroundColor: 'white', marginHorizontal: 10, borderRadius: 15, borderWidth: 1}}  >
                                       <View>
                                          
                                       </View>
                                       {(status === true)?
                                          <Pressable
                                          onPress={
                                              ()=>{ 
                                                UploadImage(),
                                                setModalVisible1(!modalVisible1)
                                              }      
                                             }
                                          // onPress={() => setModalVisible1(!modalVisible1)}
                                          >
                                             <Text 
                                                style={{ 
                                                   backgroundColor: '#2196F3', 
                                                   marginTop: 20, 
                                                   marginHorizontal: 20, 
                                                   paddingVertical: 10, 
                                                   textAlign: 'center', 
                                                   color: 'white', 
                                                   fontSize: 18 , 
                                                   borderRadius: 20,
                                                   fontWeight: 'bold'
                                                }}>Đồng ý
                                             </Text>
                                          </Pressable>:
                                          <Pressable></Pressable>
                                       }
                                       
                                       <Pressable
                                          onPress={
                                                pickImage
                                             }
                                          // onPress={() => setModalVisible1(!modalVisible1)}
                                       >
                                          <Text 
                                             style={{ 
                                                backgroundColor: '#2196F3', 
                                                marginTop: 20,
                                                marginBottom: 20, 
                                                marginHorizontal: 20, 
                                                paddingVertical: 10, 
                                                textAlign: 'center', 
                                                color: 'white', 
                                                fontSize: 18 , 
                                                borderRadius: 20,
                                                fontWeight: 'bold'
                                             }}>Chọn ảnh
                                          </Text>
                                       </Pressable>
                                       <Pressable
                                          onPress={() => setModalVisible1(!modalVisible1)}
                                       >
                                          <Text 
                                             style={{ 
                                                backgroundColor: 'gray', 
                                                marginBottom: 20, 
                                                marginHorizontal: 20, 
                                                paddingVertical: 10, 
                                                textAlign: 'center', 
                                                color: 'white', 
                                                fontSize: 18,
                                                borderRadius: 20,
                                                fontWeight: 'bold'
                                             }}>Hủy bỏ
                                          </Text>
                                       </Pressable>
                                    </View>
                                 </View>
                              </Modal>
                           </View> 
                     {/* End modal */}
                     {/* Modal */}  
                              <View>
                                 <Modal
                                 animationType="slide"
                                 transparent={true}
                                 visible={modalVisible}
                                 onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                 }}
                                 >
                                 <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                          borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Họ và tên</Text>
                                          <TextInput placeholder={user.users.data.fullname} ></TextInput>
                                       </View>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                          borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Số CMND</Text>
                                          <TextInput placeholder={user.users.data.IDCard} keyboardType='number-pad'  onChangeText={(val) => handleIdcard(val)} ></TextInput>
                                         
                                          {
                                             (validate.valiidcard === false)?
                                             <View>
                                                <Entypo name='warning' size={16} color={'red'} style={{ paddingLeft: 5}} onPress={()=>Alert.alert("Nhập đúng CMND!")} /> 
                                             </View>
                                             :
                                             <View>
                                               
                                             </View>
                                          }
                                       </View>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                           borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Email</Text>
                                          <TextInput placeholder={user.users.data.email} onChangeText={(val) => handleEmail(val)} ></TextInput>   
                                          {
                                             (validate.valiemail === false)?
                                             <View>
                                                <Entypo name='warning' size={16} color={'red'} style={{ paddingLeft: 5}} onPress={()=>Alert.alert("Nhập đúng email!")} /> 
                                             </View>
                                             :
                                             <View>
                                               
                                             </View>
                                          }
                                       </View>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                           borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Số điện thoại</Text>
                                          <TextInput placeholder={user.users.data.phone} keyboardType='number-pad' onChangeText={(val) => handlePhone(val)}></TextInput>
                                          {
                                             (validate.valiphone === false)?
                                             <View>
                                                <Entypo name='warning' size={16} color={'red'} style={{ paddingLeft: 5}} onPress={()=>Alert.alert("Nhập đúng số điện thoại!")} /> 
                                             </View>
                                             :
                                             <View>
                                               
                                             </View>
                                          }
                                       </View>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                           borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Địa chỉ</Text>
                                          <TextInput placeholder={user.users.data.address} onChangeText={(val) => handleAddress(val)}  ></TextInput>
                                       </View>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                           borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Ngày sinh</Text>
                                          {/* <TextInput placeholder={user.users.data.birthday} ></TextInput> */}
                                          <View style={{marginBottom: 5}} >
                                             <ModalDatePicker 
                                                locale="en" 
                                                onSelect={(date) => {setdate(date)} }
                                                isHideOnSelect={true}
                                                initialDate={new Date()}
                                                button={<Text style={{fontSize: 14, color: 'gray'}}>{Moment(datee).format('dddd  DD/MM/YYYY')}</Text>}
                                             />     
                                            
                                          </View>
                                        
                                       </View>
                                       <View style={{
                                          alignItems: "center",
                                          flexDirection: 'row',
                                           borderBottomColorWidth: '#DCDCDC',
                                          borderBottomWidth: 1,
                                          marginBottom: 10
                                       }}>   
                                          <Text style={{flex:1}}>Giới tính</Text>
                                          {/* <TextInput placeholder={user.users.data.sex} ></TextInput> */}
                                          <View style={{
                                             fontSize: 14,
                                             marginBottom: 5
                                          }}>
                                             <ModalDropdown 
                                                value={user.users.data.sex} 
                                                onSelect={(val)=>handleGender(val)} 
                                                textStyle={{fontSize: 14}} 
                                                defaultValue={user.users.data.sex}    
                                                options={['Nam', 'Nữ', 'Giới tính khác']} 
                                                dropdownStyle={{width: 250, height: 120, borderWidth: 2}} 
                                                dropdownTextStyle={{fontSize: 14}}
                                                
                                             >

                                             </ModalDropdown>
                                          </View>
                                         

                                       </View>
                                       <TouchableOpacity
                                       style={[styles.button, styles.buttonClose,{marginBottom: 10}]}
                                       onPress={() =>{ setModalVisible(!modalVisible), UpdateInforUser()}}
                                       >
                                       <Text style={styles.textStyle}>Cập nhật</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                       style={[styles.button, styles.buttonClose, {backgroundColor:'gray'}]}
                                       onPress={() =>{ setModalVisible(!modalVisible, Load())}}
                                       >
                                       <Text style={styles.textStyle}>Trở lại</Text>
                                       </TouchableOpacity>
                                    </View>
                                 </View>
                                 </Modal>
                                 <TouchableOpacity style={{ marginHorizontal: 10}}
                                    onPress={ ()=> setModalVisible(true)}
                                 >  
                                     <FontAwesome5  name="edit" size={23} color="#043927" />
                                 </TouchableOpacity>
                              </View>
                  
                     
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
                           <View 
                              style={{
                              flex: 2.5/4,
                              width: 115,
                              height: 80,
                              borderRadius: 80,
                              backgroundColor: 'yellow'
                           }}>
                              <TouchableOpacity style={{flex:1}} onPress={() => setModalVisible1(true)}>
                                 {/* { (image)?
                                     image && <Image source={{ uri: image }} style={{ flex: 1,  borderRadius: 80}} />                                        
                                    :
                                    <Image source={{uri: `${host}/${user.users.data.avatar}` }} style={{ flex: 1,  borderRadius: 80}} />
                                 } */}
                                       <Image source={{uri: `${host}/${user.users.data.avatar}` }} style={{ flex: 1,  borderRadius: 80}} />
                                    {/* image && <Image source={{ uri: image }} style={{ flex: 1,  borderRadius: 80}} />                                        */}
                                    
                              </TouchableOpacity>
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
                           marginLeft: 5
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16,
                             
                           }}>Tên đăng nhập</Text>
                           <Text style={{
                              color: 'red'
                           }}>{user.users.data.username}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}
                              onPress={ ()=> setModalVisible(true)}
                           >
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
                           marginLeft: 5
                           
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Số CMND</Text>
                           <Text style={{

                           }}>{user.users.data.IDCard}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
                              <Ionicons name="chevron-forward-outline" size={22} color="#043927" style={{opacity: 0}} />
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
                           marginLeft: 5
                           
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Họ và tên</Text>
                           <Text style={{

                           }}>{user.users.data.fullname}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
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
                           marginLeft: 5
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Số điện thoại</Text>
                           <Text style={{

                           }}>{user.users.data.phone}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
                              <Ionicons name="chevron-forward-outline" size={22} color="#043927" style={{opacity: 0}}/>
                           </TouchableOpacity>
                        </View>
                        <View style={{
                           flexDirection: 'row',
                           borderBottomWidth: 1,
                           borderBottomColor: 'rgba(200,200,200,0.9)',
                           flex: 1/2,
                           alignItems:'center',
                           paddingBottom: 3,
                           marginLeft: 5
                           
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Email</Text>
                           <Text style={{

                           }}>{user.users.data.email}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
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
                           marginLeft: 5
                           
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Địa chỉ</Text>
                           <Text style={{

                           }}>{user.users.data.address}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
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
                           marginLeft: 5
                           
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Ngày sinh</Text>
                           <Text style={{

                           }}>{user.users.data.birthday}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
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
                           marginLeft: 5
                           
                        }}>
                           <Text style={{
                              flex: 1,
                              // fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16   
                           }}>Giới tính</Text>
                           <Text style={{

                           }}>{user.users.data.sex}</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
                              <Ionicons name="chevron-forward-outline" size={22} color="#043927" style={{opacity: 0}} />
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
                              marginLeft: 5
                        }}>
                           <Text 
                              style={{
                              flex: 1,
                              //  fontWeight: 'bold',
                              marginHorizontal: 5,
                              fontSize: 16 
                           }}>Đổi mật khẩu</Text>
                           <TouchableOpacity style={{ marginRight: 5}}>
                              <Ionicons name="chevron-forward-outline" size={22} color="#043927" style={{opacity: 1}} />
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>            
               </View>
            </View>
         </View>
      </Animated.View>  
   )
}

export default UpddateProfileUser;



const styles = StyleSheet.create({
   centeredView: {
     flex: 1,
     justifyContent: "center",
   //   alignItems: "center",
     marginTop: 22
   },
   modalView: {
     margin: 20,
     backgroundColor: "white",
     borderRadius: 20,
     padding: 35,
   //   alignItems: "center",
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5
   },
   button: {
     borderRadius: 20,
     padding: 10,
     elevation: 2
   },
   buttonOpen: {
     backgroundColor: "#F194FF",
   },
   buttonClose: {
     backgroundColor: "#2196F3",
   },
   textStyle: {
     color: "white",
     fontWeight: "bold",
     textAlign: "center"
   },
   modalText: {
     marginBottom: 15,
   //   textAlign: "center"
   }
 });