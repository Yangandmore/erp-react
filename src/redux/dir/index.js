/*
 * 字典维护
 */
import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { dirListApi } from './api';

const defaultState = Map({
  dirData: [],
  loadDirList: {
    isfetching: false,
    err: undefined,
    msg: undefined
  }
});

const prefix = 'DIR';
const LIST_DIR = `${prefix}_LIST`;

const dirAction = {};
dirAction.actionDirList = createActionAsync(LIST_DIR, dirListApi);

const dirReducer = createReducer(
  {
    [LIST_DIR](state, action) {
      return {
        REQUEST() {
          return state.merge({
            loadDirList: {
              isFetching: true,
              msg: undefined,
              err: undefined,
            }
          });
        },
        SUCCESS() {
          return state.merge({
            dirData: action.res.body.data,
            loadDirList: {
              isFetching: false,
              msg: action.res.body.msg,
            }
          });
        },
        FAILURE() {
          return state.merge({
            dirData: [],
            loadDirList: {
              isFetching: false,
              err: action.err.errbody
            }
          });
        }
      };
    }
  },
  defaultState
);

const select = (state) => state.get('dir');
const dirSelect = {};
dirSelect.loadDirListSelect = createSelector(select, (state) => state.get('loadDirListSelect'));

export { dirAction, dirReducer, dirSelect };
