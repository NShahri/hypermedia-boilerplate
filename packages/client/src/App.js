import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './pages/Routes'
import {I18nextProvider, Trans, translate} from 'react-i18next';

class App extends Component {
    render() {
        const {i18n} = this.props;

        return (
            <I18nextProvider i18n={i18n}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">
                            <Trans i18nKey="header.welcome">
                                Welcome to React
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
