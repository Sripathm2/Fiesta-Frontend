import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './css/App.css';
import Create_user from './components/Create_user'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import login from './components/login'
import forgotpassword from './components/forgotpassword'
import event from './components/event'
//import QuesAnswer from './components/QuesAnswer'

import Route from "react-router/es/Route";

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/create_user" component={Create_user} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={login}/>
            <Route path="/forgot" component={forgotpassword}/>
            <Route path="/event" component={event}/>
        </div>
    </Router>
);

export default App;
