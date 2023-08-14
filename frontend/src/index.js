import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import init from './init';

const vdom = init();

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {vdom}
    </Provider>
  </React.StrictMode>
);
