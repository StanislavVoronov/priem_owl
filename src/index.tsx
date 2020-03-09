import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './global.css';
import { Provider } from 'react-redux';
import Enroll from './pages/Enroll';
import { createCustomStore } from '$store';
import { StylesProvider } from '@material-ui/styles';
import { enhanceStoreCreator, sagaMiddlewareDescriptor } from '@black_bird/utils';
import rootSagas from './rootSagas';

const store = enhanceStoreCreator(createCustomStore(), sagaMiddlewareDescriptor(rootSagas));

ReactDOM.render(
	<Provider store={store()}>
		<StylesProvider injectFirst>
			<Enroll />
		</StylesProvider>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
