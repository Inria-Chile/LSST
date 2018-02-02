import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import Survey from './components/Survey/Survey';
import Mirrors from './components/Mirrors/Mirrors';
import Dome from './components/Dome/Dome';
import Dashboard from './components/Dashboard/Dashboard';
import Dashboard2 from './components/Dashboard/Dashboard2';
import FieldDetails from './components/Survey/FieldDetails/FieldDetails';
import ServerAlerts from './components/ServerAlerts/ServerAlerts';
import CableWraps from './components/Alarms/CableWraps/CableWraps';
import Environment from './components/Environment/Environment';
import Alarms from './components/Alarms/Alarms';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router-dom'
import PlatformLift from './components/Alarms/PlatformLift/PlatformLift';

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
            <Route path='/dashboard2' component={Dashboard2}/>
            <Route path='/field' component={FieldDetails}/>
            <Route path='/server_alerts' component={ServerAlerts}/>
            <Route path='/cable_wraps' component={CableWraps}/>
            <Route path='/environment' component={Environment}/>
            <Route path='/alarms' component={Alarms}/>
            <Route path='/lift' component={PlatformLift}/>
        </Switch>
    </BrowserRouter>), document.getElementById('root'));

registerServiceWorker();