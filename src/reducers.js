import { combineReducers } from 'redux-immutable';
import { mainReducer, userReducer, tokenReducer, roleReducer, dirReducer } from './redux';

const rootReducer = combineReducers({ main: mainReducer, user: userReducer, token: tokenReducer, role: roleReducer, dir: dirReducer });

export default rootReducer;
