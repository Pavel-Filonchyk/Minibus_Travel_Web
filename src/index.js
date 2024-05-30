import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './core/store'
import {Provider} from 'react-redux';
import Main from "./components/Main/Main"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
)
