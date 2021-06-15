/*
 * user 用户部分
 */
import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { signApi, loginApi, getUserApi } from './api';

const defaultState = Map({
  userData: undefined,
  loadSign: {
    isfetching: false,
    err: undefined,
    msg: undefined
  },
  loadLogin: {
    isFetching: false,
    err: undefined,
    msg: undefined
  },
  loadUser: {
    isFetching: false,
    err: undefined,
    msg: undefined
  }
});

const prefix = 'USER';
const SIGN_USER = `${prefix}_SIGN`;
const LOGIN_USER = `${prefix}_LOGIN`;
const GETUSER_USER = `${prefix}_GETUSER`;

const userAction = {};
userAction.actionSignUser = createActionAsync(SIGN_USER, signApi);
userAction.actionLoginUser = createActionAsync(LOGIN_USER, loginApi);
userAction.actionGetUser = createActionAsync(GETUSER_USER, getUserApi);

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
  },
  [LOGIN_USER](state, action) {
    return {
      REQUEST() {
        return state.merge({
          loadLogin: {
            isFetching: true,
            err: undefined,
            msg: undefined
          }
        });
      },
      SUCCESS() {
        return state.merge({
          loadLogin: {
            isFetching: false,
            msg: action.res.body.msg
          }
        });
      },
      FAILURE() {
        return state.merge({
          loadLogin: {
            isFetching: false,
            err: action.err.errbody
          }
        });
      }
    };
  },
  [GETUSER_USER](state, action) {
    return {
      REQUEST() {
        return state.merge({
          loadUser: {
            isFetching: true,
            err: undefined,
            msg: undefined
          }
        });
      },
      SUCCESS() {
        return state.merge({
          userData: action.res.body.data,
          loadUser: {
            isFetching: false,
            msg: action.res.body.msg
          }
        });
      },
      FAILURE() {
        return state.merge({
          userData: undefined,
          loadUser: {
            isFetching: false,
            err: action.err.errbody
          }
        });
      }
    };
  },
}, defaultState);

const select = (state) => state.get('user');
const userSelect = {};
userSelect.loadSignSelect = createSelector(select, (state) => state.get('loadSign'));
userSelect.loadLoginSelect = createSelector(select, (state) => state.get('loadLogin'));
userSelect.userSelect = createSelector(select, (state) => state.get('userData'));

export { userAction, userReducer, userSelect };
