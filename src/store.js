import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import rootReducer from './reducers';

let engine = createEngine('data');

// 白名单
// 黑名单
// 多层数组表示嵌套
engine = filter(engine,
  ['whitelisted-key', ['main'], ['user'], ['token'], ['role'], ['dir']],
  ['blacklisted-key', ['user', 'loadSign'], ['user', 'loadLogin'], ['user', 'loadUser'], ['role', 'loadRole'], ['dir', 'loadDirList']]);

const getState = async () => {
  const a = await new Promise((resolve) => {
    engine.load()
      .then((state) => {
        console.log(state);
        resolve(state);
      })
      .catch(() => resolve({}));
  });
  return a;
};

const getLocalState = () => engine.load()
  .then((state) => state)
  .catch(() => ({}));

const configureStore = (initialState = fromJS({})) => {
  // const a = await getState();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

  const reducer = storage.reducer(rootReducer, merger);
  const middleware = storage.createMiddleware(engine);

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, middleware)),
  );

  const load = storage.createLoader(engine);
  load(store);

  return store;
};

const configureLocalStateStore = async () => {
  const state = await getLocalState();
  const store = configureStore(fromJS(state));
  return store;
};

export { configureStore, configureLocalStateStore };
