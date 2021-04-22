import * as React from 'react';
import {View,Text} from 'react-native'
import { List } from 'react-native-paper';
import { useDispatch, useSelector} from 'react-redux'

const MyComponent = () => {
   const [expanded, setExpanded] = React.useState(true);
   const work = useSelector(state =>state) 
   const handlePress = () => setExpanded(!expanded);

  return (
     <View>
 {
    work.works.clearList.map(dt =>(
       
         <View>
         <List.Section title="Accordions">
            {
               dt.map(data =>( 
                  <List.Accordion
                  title="Uncontrolled Accordion"
                  left={props => <List.Icon {...props} icon="folder" />}>

                  <List.Item title="First item" />
                  <List.Item title="Second item" />

               </List.Accordion>
               ))
            }
               
            </List.Section>
         </View>
      
    ))
 }
     </View>


      
    
  );
};

export default MyComponent;