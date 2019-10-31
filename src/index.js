import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

// importa o react-redux e o store
import { Provider } from 'react-redux'
import store from './store/index'


// importa as configs do firebase
import './firebaseConfig'
const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    , rootElement);
