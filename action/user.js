import { USER_DATA, DELETE_USER, ADDRESS_DATA } from './types';


export const addUser = (user) => (
   {
      type: USER_DATA,
      data: user
   }
)

// export const addAddress = (addre) =>({
//       type: ADDRESS_DATA,
//       data: addre
//    }
// )

export const deleteUse = (key) =>(
   {
      type: DELETE_USER,
      key: key
   }
)