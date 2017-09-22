import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import Survey from './components/Survey/Survey';
import Status from './components/Status/Status';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' render={() => (
                <Redirect from='/' to='/survey'/>
            )}/>
            <Route path='/status' component={Status}/>
            <Route path='/survey' component={Survey}/>
        </Switch>
    </BrowserRouter>), document.getElementById('root'));

registerServiceWorker();