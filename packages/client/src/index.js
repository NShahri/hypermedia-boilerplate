import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import i18n from './i18n';

ReactDOM.render(<App i18n={i18n}/>, document.getElementById('root'));
registerServiceWorker();
