
import React from 'react';
import { StyleSheet, Image, AsyncStorage} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const OnboardingScreen = ({navigation}) => {
    
   const storeData = async () =>{
      try{
         await AsyncStorage.setItem('Welcome', 'true')
         navigation.replace("Login")
      }catch(error) {
         console.log(error);
      }      
   }
   
   
   return (  
   <Onboarding
      onSkip={()=>{
                     storeData()
                  }
            }
      onDone={()=>{
                     storeData()
                  }
            }
         pages={[
            {
               backgroundColor: '#00A6B4',
               image: <Image source={require('../assets/clear4.png')} style={ styles.image1} />,
               title: 'Bạn bận rộn',
               subtitle: 'Vì công việc quá nhiều',
            },
            {
               backgroundColor: '#00B672',
               image: <Image source={require('../assets/clear1.png')}   />,
               title: 'Bạn cần dọn dẹp',
               // subtitle: 'Done with React Native Onboarding Swiper',
               subtitle: ""
            },
            {
               backgroundColor: '#F9952B',
               image: <Image source={require('../assets/clear2.png')} style={styles.image2} />,
               title: 'Đừng lo lắng!',
               subtitle: 'Vì đã có chúng tôi giúp bạn!',
            }
         ]}
      />
  );
}

export default OnboardingScreen;
const styles = StyleSheet.create({
  container: {
   //  flex: 1,
   //  backgroundColor: '#fff',
   //  alignItems: 'center',
   //  justifyContent: 'center',
  },
  image1: {
     width: 400,
     height: 300
  },
  image2: {
     width:400,
     height: 400
  }
  
});