import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './screens/Category.js';
import Categories from './screens/Categories.js';

const Stack = createStackNavigator();

const AppNavigator =  () => {
   return (
      <Stack.Navigator>
         {/* <Stack.Screen name = 'Category' component={Categories} />
         <Stack.Screen name = 'Category1' component={Category} /> */}
         <View>
            asdsadas
         </View>
         
      </Stack.Navigator>
   )
}



export default AppNavigator;