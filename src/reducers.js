import { combineReducers } from 'redux-immutable';
import { mainReducer, userReducer } from './redux';

const rootReducer = combineReducers({ main: mainReducer, user: userReducer });

export default rootReducer;
