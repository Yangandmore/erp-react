import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const defaultState = fromJS({
  token: undefined,
  user: undefined
});

const prefix = 'USER';

const userAction = {};

const userReducer = createReducer({}, defaultState);

const select = (state) => state.get('user');
const userSelect = {};
userSelect.tokenSelect = createSelector(select, (state) => state.get('token'));

export { userAction, userReducer, userSelect };
