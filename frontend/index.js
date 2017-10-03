import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContactsApp from './ContactsApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ContactsApp />, document.getElementById('root'));
registerServiceWorker();
