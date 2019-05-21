import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './global.css';
import { Provider } from 'react-redux';
import EnrollContainer from './pages/Enroll';
import store from '$store';

ReactDOM.render(
	<Provider store={store}>
		<EnrollContainer />
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
