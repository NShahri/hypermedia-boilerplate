import React from 'react';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import Home from "../pages/Home";
import Callback from "../pages/Callback";
import Login from '../pages/Login';
import authProvider from "../infrastructure/authProvider";

const PrivateRoute = props => {
    let isAuthenticated = authProvider.isAuthenticated();
    return (
        isAuthenticated ? <Route {...props} /> : <Redirect to="/"/>
    );
};

export default function (props) {
    return <Router>
        <Switch>
            <Route path="/callback" render={props => <Callback {...props} />}/>
            <Route path="/login" render={props => <Login {...props} />}/>
            <PrivateRoute path="/home" render={props => <Home {...props}/>}/>

            <Route render={() => <Redirect to={authProvider.isAuthenticated() ? "/home" : "/login"}/>}/>
        </Switch>
    </Router>;
}