import {USER_DATA, DELETE_FOOD} from '../action/types';

const initialState = {
   foodList: {},
}

const foodReducer = (state = initialState, action) =>{
    switch (action.type){
      case USER_DATA:
         return {
            data: action.data   
         };
      case DELETE_FOOD:
         return 

         default:
            return state;
    }
}

export default foodReducer;