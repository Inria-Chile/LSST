import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import Survey from './components/Survey/Survey';
import Mirrors from './components/Mirrors/Mirrors';
import Dome from './components/Dome/Dome';
import Dashboard from './components/Dashboard/Dashboard';
import ServerAlerts from './components/ServerAlerts/ServerAlerts';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' render={() => (
                <Redirect from='/' to='/survey'/>
            )}/>
            <Route path='/survey' component={Survey}/>
            <Route path='/mirrors' component={Mirrors}/>
            <Route path='/dome' component={Dome}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/server_alerts' component={ServerAlerts}/>
        </Switch>
    </BrowserRouter>), document.getElementById('root'));

registerServiceWorker();