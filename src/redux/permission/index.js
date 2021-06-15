/*
 * 权限部分
 */
import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { Map } from 'immutable';
import { createSelector } from 'reselect';

const defaultoptions = Map({

});

const prefix = 'PERMISSION';

const permissionAction = {};

const permissionReducer = createReducer({

}, defaultoptions);

const select = (state) => state.get('permission');
const permissionSelect = {};

export { permissionAction, permissionReducer, permissionSelect };
