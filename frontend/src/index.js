import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import AuthState from './context/auth/authState';

ReactDOM.render(
  <React.StrictMode>
     <AuthState>
    <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);

