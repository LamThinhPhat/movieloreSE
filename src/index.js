import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MovieProvider, UserProvider } from './store'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
