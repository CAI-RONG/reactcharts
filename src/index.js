import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(
	<BrowserRouter >
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
//serviceWorker.register();