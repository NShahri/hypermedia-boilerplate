import React from 'react';
import PropTypes from 'prop-types';
import authProvider from "./authProvider";
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = props => {
    let isAuthenticated = authProvider.isAuthenticated();

    return (
        isAuthenticated ? <Route {...props} /> : <Redirect to="/"/>
    );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
