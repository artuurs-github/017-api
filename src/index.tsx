import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/reset.scss';
import './styles/flexboxgrid.scss';
import './fonts/Virgil.woff2';
import './fonts/get_schwifty.ttf';
import './fonts/CoveredByYourGrace-Regular.ttf';
import './styles/body.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
