import {WORK_USER, DELETE_WORK_USER, CLEAR_WORK, COOKING_WORK, WASHING_WORK} from './types'

// export const addWork = (work) =>(
//    {
//       type: WORK_USER,
//       data: work
//    }
// )

// export const addWork = (work ) =>{
//    return (
//       {
//          type: WORK_USER,
//          data: work,
         
//       }
//    )
// }
export const addWorkClear = (clear ) =>{
   return (
      {
         type: CLEAR_WORK,
         data: clear,
         
      }
   )
}
export const addWorkCooking = (cook ) =>{
   return (
      {
         type: COOKING_WORK,
         data: cook,
         
      }
   )
}
export const addWorkWashing = (wash ) =>{
   return (
      {
         type: WASHING_WORK,
         data: wash,
         
      }
   )
}