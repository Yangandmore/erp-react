/*
 * 角色部分
 */
import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { userRoleApi } from './api';

const defaultState = Map({
  userRole: [],
  loadRole: {
    isfetching: false,
    err: undefined,
    msg: undefined
  }
});

const prefix = 'ROLE';
const USER_ROLE = `${prefix}_USER`;

const roleAction = {};
roleAction.actionUserRole = createActionAsync(USER_ROLE, userRoleApi);

const roleReducer = createReducer({
  [USER_ROLE](state, action) {
    return {
      REQUEST() {
        return state.merge({
          loadRole: {
            isFetching: true,
            msg: undefined,
            err: undefined,
          }
        });
      },
      SUCCESS() {
        return state.merge({
          userRole: action.res.body.data,
          loadRole: {
            isFetching: false,
            msg: action.res.body.msg
          }
        });
      },
      FAILURE() {
        return state.merge({
          userRole: [],
          loadRole: {
            isFetching: false,
            err: action.err.errbody
          }
        });
      }
    };
  }
}, defaultState);

const select = (state) => state.get('role');
const roleSelect = {};

export { roleAction, roleReducer, roleSelect };
