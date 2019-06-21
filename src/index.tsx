import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './global.css';
import { Provider } from 'react-redux';
import Enroll from './pages/Enroll';
import store from '$store';
import { StylesProvider } from '@material-ui/styles';

ReactDOM.render(
	<Provider store={store}>
		<StylesProvider injectFirst>
			<Enroll />
		</StylesProvider>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
