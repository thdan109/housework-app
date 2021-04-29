import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalShowInforStaff from '../../components/customer/ModalShowInforStaff'
const ScanQRScreen = ({navigation,route}) => {
   const [hasPermission, setHasPermission] = useState(null);
   const [scanned, setScanned] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [ id , setID ] = React.useState()
   const idWork = route.params.idWork
   const typeWork = route.params.type
   const listStaff = route.params.staff

   useEffect(() => {
      (async () => {
         const { status } = await BarCodeScanner.requestPermissionsAsync();
         setHasPermission(status === 'granted');
      })();
   }, []);

   const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      
      if ((data !== null) && (type !== null) ){
         setID(data)
         setModalVisible(true)
      }
   };

   if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
   }
   if (hasPermission === false) {
      return <Text>No access to camera</Text>;
   }

   return (
      <View style={styles.container}>
       
            <BarCodeScanner
               onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
               style={StyleSheet.absoluteFillObject}
               // style={{ height: '50%', width:'60%'}}
            />
        
            <View>
               {scanned && <Button title={'Nhấn tiếp tục để quét'} onPress={() => {setScanned(false), setID(null)}} />}   
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white'}}> 
               <ModalShowInforStaff isModalVisible={modalVisible} setModalVisible={setModalVisible} idStaff={id} idWork={idWork} typeWork={typeWork} staff={listStaff}/>   
               {/* <Text onPress={()=>console.log(listStaff)}>aaaaaaaaaaaaaaaaaaa</Text>                */}
            </View>
      </View>
   );
}

export default ScanQRScreen

const styles = StyleSheet.create({
   container:{
      flex:1,
      backgroundColor: 'black',
   },
   scan:{

   },
   containerModal:{
      backgroundColor:'white'
   }
})