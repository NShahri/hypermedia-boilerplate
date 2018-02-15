import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './pages/Routes'
import {I18nextProvider, Trans, translate} from 'react-i18next';
import config from "./infrastructure/config";

class App extends Component {
    render() {
        const {i18n} = this.props;

        return (
            <I18nextProvider i18n={i18n}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">
                            <Trans i18nKey="header.welcome" count={100}>
                                Welcome to
                                <span><strong>React App</strong></span>
                                . version:
                                <a href="https://reactjs.org/">{{appVersion: config.appVersion}}</a>
                            </Trans>
                        </h1>
                    </header>
                    <AppRoutes/>
                </div>
            </I18nextProvider>
        );
    }
}

export default translate()(App);
