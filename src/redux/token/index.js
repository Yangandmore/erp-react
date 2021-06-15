/*
 * token及userId部分
 */
import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { Map } from 'immutable';
import { createSelector } from 'reselect';

const defaultState = Map({
  token: undefined,
  userId: undefined
});

const prefix = 'TOKEN';
const TOKEN_AND_USERID = `${prefix}_SET`;

const tokenAction = {};
tokenAction.actionSetToken = createAction(TOKEN_AND_USERID, 'newToken', 'newUserId');

const tokenReducer = createReducer({
  [TOKEN_AND_USERID](state, action) {
    return state.merge({
      token: action.newToken,
      userId: action.newUserId,
    });
  }
}, defaultState);

const select = (state) => state.get('token');
const tokenSelect = {};
tokenSelect.getTokenSelect = createSelector(select, (state) => state.get('token'));
tokenSelect.getUserIdSelect = createSelector(select, (state) => state.get('userId'));

export { tokenAction, tokenReducer, tokenSelect };
