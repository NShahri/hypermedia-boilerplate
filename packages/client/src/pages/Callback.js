import React, {Component} from 'react';
import PropTypes from 'prop-types';
import authProvider from "../auth/authProvider";
import {Redirect} from 'react-router-dom';
import {CircularProgress} from 'material-ui/Progress';

class Callback extends Component {
    state = {
        redirectTo: ''
    };

    componentDidMount() {
        authProvider.signInRedirectCallback().then(() => {
            this.setState({redirectTo: '/'})
        }).catch((err) => {
            this.setState({redirectTo: '/', err})
        });
    }

    render() {
        const {redirectTo} = this.state;

        return (
            <div>
                {redirectTo !== '' && <Redirect to={redirectTo}/>}
                Processing AUTH ...
                <CircularProgress/>
            </div>
        );
    }
}

Callback.propTypes = {};

export default Callback;
