import { USER_DATA, DELETE_USER } from './types';


export const addUser = (user) => (
   {
      type: USER_DATA,
      data: user
   }
)


export const deleteUse = (key) =>(
   {
      type: DELETE_USER,
      key: key
   }
)