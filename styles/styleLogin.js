import { StyleSheet , Dimensions} from 'react-native';


const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({ 
   container: {  
      // flex: 1,
      width: "100%",
      height: "100%"
   },
   centerAlign: {
      justifyContent: 'center',
      alignItems: 'center'
   },
   logo: {
      width: width / 2,
      height: height / 5
   },
   inputContainer:{
      backgroundColor: 'rgba(255,255,255,1)',
      padding: 20,
      marginTop: -height / 1.6,
      borderRadius: 20,
      width: width / 1.2,
      height: height / 2,
   },
   input: {
      textAlign: 'center',
      borderWidth: 1,
      fontSize: 18,
      borderColor: "#aaa",
      borderRadius: 30,
      width: width / 1.35,
      padding: 10,
      marginVertical: 15,
   }
})

export { styles }  ;