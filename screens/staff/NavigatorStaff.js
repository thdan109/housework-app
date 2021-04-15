import React from 'react'
import { View, Text, Dimensions, Alert, StatusBar} from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from '../../components/staff/CustomeDrawer';
import HomeStaff from './HomeStaff'
import ProfileStaff from './ProfileStaff';

const Drawer = createDrawerNavigator()



const { width, height } = Dimensions.get('screen')


const Chat = () =>{
   return(
      <View style= {{flex: 1, justifyContent: "center", alignItems: "center"}}> 
         <Text>Không có cuộc trò chuyện nào</Text>
      </View>
   )
}
 const Home = () => {
    return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text> Home</Text>
       </View>
    )
 }

 const Notification = () =>{
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Không có thông báo</Text>
      </View>
   )
}

const History = () =>{
   return (
      <View style={{ flex:1 , justifyContent: 'center', alignItems: 'center'}} >
         <Text>Lịch sử làm việc</Text>
      </View>
   )
}

const NavigatorStaff  = ({navigation, props}) =>{
   return(   
      <View style={{flex:1}} >
         <StatusBar  backgroundColor='black'/>
         <Drawer.Navigator 
            initialRouteName="Home" 
            drawerContent={(props) => <CustomDrawer {...props} />}
         >
            <Drawer.Screen name='Home' component={HomeStaff} />
            {/* <Drawer.Screen name='Profile' component={ProfileStaff} /> */}
            <Drawer.Screen name='Notification' component={Notification} />
            <Drawer.Screen name='History' component={History} />   
         </Drawer.Navigator>
      </View>
      
   
         
      
        
   )

}

export default NavigatorStaff