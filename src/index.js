import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './routers';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import 'antd/dist/antd.css';

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>{App()}</Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
