import React from 'react';
import ReactDOM from 'react-dom';
import Login from 'components/Login';
import createStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

const store = createStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Login />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
