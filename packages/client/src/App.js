import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './pages/Routes'
import {Provider} from 'react-redux'

class App extends Component {
    render() {
        const {store} = this.props;

        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <AppRoutes/>
                </div>
            </Provider>
        );
    }
}

export default App;
