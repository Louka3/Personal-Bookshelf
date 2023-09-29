import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';

import styles from './scss/application.scss';

// import { render } from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);