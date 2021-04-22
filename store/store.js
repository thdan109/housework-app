import { createStore, combineReducers } from 'redux';
import userReducers from '../reducers/UserReducer';

import workReducers from '../reducers/WorkReducer'

const rootReducer = combineReducers({
   users: userReducers,
   works: workReducers
})

const configureStore = () => createStore(rootReducer);

export default configureStore;

