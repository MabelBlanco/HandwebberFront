import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.scss';

// import Popper from "popper.js";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { setAuthorizationHeader } from './api/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Root } from './Root';
import { store } from './store/store';
import './utils/i18n';
import storage from './utils/storage';

const socketUrl = process.env.REACT_APP_CONF_SOCKET_URL;

export const socket = io(socketUrl);

const initialToken = storage.get('auth');
if (initialToken) {
  setAuthorizationHeader(initialToken);
}

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense
        fallback={
          <div
            style={{
              color: 'white',
              backgroundColor: 'black',
              width: '1800px',
              height: '1800px',
              fontSize: '1,5em',
            }}
          >
            'Starting page...'
          </div>
        }
      >
        <App />
      </Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root
      initialToken={initialToken}
      haveInitialToken={!!initialToken}
      store={store}
      router={router}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
