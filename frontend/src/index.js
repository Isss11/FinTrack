import React from 'react';
import ReactDOM from 'react-dom/client'; // needed to import this as react-dom was not supported without adding /client
import App from './components/App.js';

// Creating the Root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);