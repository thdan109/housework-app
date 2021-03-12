import { USER_DATA, DELETE_FOOD } from './types';


export const addUser = (food) => (
   {
      type: USER_DATA,
      data: food
   }
)


export const deleteUse = (key) =>(
   {
      type: DELETE_FOOD,
      key: key
   }
)