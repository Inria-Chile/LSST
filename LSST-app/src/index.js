import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Skymap from './components/Skymap/Skymap';
// import MiniSkymaps from './components/Skymap/MiniSkymaps';
import Survey from './components/Survey/Survey';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Survey />, document.getElementById('root'));
// ReactDOM.render(<MiniSkymaps />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();