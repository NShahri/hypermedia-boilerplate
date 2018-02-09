import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import authProvider from "../infrastructure/authProvider";
import {CircularProgress} from 'material-ui/Progress';

class Login extends Component {
    componentDidMount() {
        authProvider.login();
    }

    render() {
        return (
            <Fragment>
                Redirecting to login page ...
                <CircularProgress/>
            </Fragment>
        );
    }
}

Login.propTypes = {

};

export default Login;
