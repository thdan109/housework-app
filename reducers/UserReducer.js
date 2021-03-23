import {USER_DATA, DELETE_FOOD, ADDRESS_DATA} from '../action/types';

const initialState = {
   userList: {},
}

const foodReducer = (state = initialState, action) =>{
    switch (action.type){
      case USER_DATA:
         return {
            data: action.data   
         };
      // case ADDRESS_DATA:
      //    return{
      //       data: action.data
      //    };
      case DELETE_FOOD:
         return 
      
         default:
            return state;
    }
}

export default foodReducer;