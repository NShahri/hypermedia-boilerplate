import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootSaga from './sagas';
import configureStore from './stores';


const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

registerServiceWorker();
