import { createStore, combineReducers } from 'redux';
import foodReducer from '../reducers/UserReducer';
import userReducers from '../reducers/UserReducer';

const rootReducer = combineReducers({
   users: userReducers

})

const configureStore = () => createStore(rootReducer);

export default configureStore;

