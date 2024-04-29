// React and ReactDOM are imported to use React's functionalities and to render the app in the DOM.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import './dist/index.css';
import App from './App.tsx';
import {store} from './store.tsx';
import './i18n.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  
);
