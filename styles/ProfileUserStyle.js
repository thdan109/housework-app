import { StyleSheet, Dimensions } from 'react-native';

const {width,height} = Dimensions.get("screen");

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // width: '100%',
      // height: "100%"
   },
   
   title: {
      flexDirection: 'row',
      // flex: 1,
      borderWidth: 1,
      // justifyContent:'center',
      alignItems: 'center',
      // marginTop: 25,
   },
   avatar: {
      width: width / 1.1,
      height: height / 12,
      marginLeft: 50,
      marginTop: 30
   },
   menu: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10
   },
   menuc:{
      fontSize: 18,
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderBottomWidth: 2,
      borderBottomColor: "black"
   }


})

export { styles };