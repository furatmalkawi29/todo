import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';

const Main = () => {
  return ( <App />);
}
 
export default Main;


const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
