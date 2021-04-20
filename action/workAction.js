import {WORK_USER} from './types';

export const addWorkUser = (infoWorkUser) =>(
   {
      type: WORK_USER,
      data: infoWorkUser
   }
)