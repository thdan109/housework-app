import { WORK_USER, DELETE_WORK_USER, CLEAR_WORK, COOKING_WORK, WASHING_WORK } from '../action/types'

const initialState = {
   // workList: [],
   clearList: [],
   cookingList: [],
   washingList: []
}

const workReducer = (state = initialState, action) =>{
   switch (action.type){
      // case WORK_USER:
      //    return  {
      //       workList: [
      //          ...state.workList,
      //          action.data
      //       ]
      //    }
      
      case CLEAR_WORK:
         return {
            ...state,
            clearList: [
               // ...state.clearList,
               action.data
            ]
         };
      case COOKING_WORK: 
         return {
            ...state,
            cookingList: [
               // ...state.cookingList,
               action.data
            ]
         };
      case WASHING_WORK: 
         return{
            ...state,
            washingList: [
               // ...state.washingList,
               action.data
            ]
         };
      default:
         return state
   }
}

export default workReducer