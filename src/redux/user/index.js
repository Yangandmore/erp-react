import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { signApi } from './api';

const defaultState = Map({
  token: undefined,
  user: undefined,
  loadSign: {
    isFetching: false,
    err: undefined,
    msg: undefined
  }
});

const prefix = 'USER';
const SIGN_USER = `${prefix}_SIGN`;

const userAction = {};
userAction.actionSignUser = createActionAsync(SIGN_USER, signApi);

const userReducer = createReducer({
  [SIGN_USER](state, action) {
    return {
      REQUEST() {
        return state.merge({
          loadSign: {
            isFetching: true,
            msg: undefined,
            err: undefined,
          }
        });
      },
      SUCCESS() {
        return state.merge({
          loadSign: {
            isFetching: false,
            msg: action.res.body.msg
          }
        });
      },
      FAILURE() {
        return state.merge({
          loadSign: {
            isFetching: false,
            err: action.err.errbody
          }
        });
      },
    };
  }
}, defaultState);

const select = (state) => state.get('user');
const userSelect = {};
userSelect.tokenSelect = createSelector(select, (state) => state.get('token'));
userSelect.loadSignSelect = createSelector(select, (state) => state.get('loadSign'));

export { userAction, userReducer, userSelect };
